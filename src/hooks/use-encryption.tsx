/* eslint-disable @typescript-eslint/no-explicit-any */
import sodium from "libsodium-wrappers";

// Constants matching Java code
const CRYPTO_KX_KEYBYTES = 32;
const CHACHA20_POLY1305_NONCEBYTES = 12;
const HKDF_DERIVED_KEY_SIZE = 32;
const HKDF_KEY_ID = 1;
const HKDF_CONTEXT = "climates";

interface EncryptSensorDataResult {
  ciphertext: string;
  nonce: string;
  devicePublicKey: string;
  additionalData?: string;
}

interface EncryptSensorDataResponse {
  cipherText: string;
  nonce: string;
}

export async function encryptSensorData(
  temperature: number,
  humidity: number,
  serverPublicKey: Uint8Array, // Provided by the backend
  deviceKeyPair: { publicKey: Uint8Array; privateKey: Uint8Array } // Reused device key pair
): Promise<EncryptSensorDataResult> {
  try {
    const start = performance.now();
    await sodium.ready;

    // Validate inputs
    if (isNaN(temperature) || isNaN(humidity)) {
      throw new Error("Temperature and humidity must be valid numbers");
    }

    if (serverPublicKey.length !== CRYPTO_KX_KEYBYTES) {
      throw new Error("Invalid server public key length");
    }

    // Validate device keys
    if (
      deviceKeyPair.publicKey.length !== CRYPTO_KX_KEYBYTES ||
      deviceKeyPair.privateKey.length !== CRYPTO_KX_KEYBYTES
    ) {
      throw new Error("Invalid device key length");
    }

    const sessionKeys = sodium.crypto_box_beforenm(
      serverPublicKey,
      deviceKeyPair.privateKey
    );

    // Uses the receive key for client-to-server encryption
    const sharedKey = sessionKeys;

    console.log("shared (hex):", sodium.to_hex(sessionKeys));

    console.log(
      "Device public key (hex):",
      sodium.to_hex(deviceKeyPair.publicKey)
    );
    console.log("Server public key (hex):", sodium.to_hex(serverPublicKey));

    // Derive encryption key using HKDF
    const derivedKey = sodium.crypto_kdf_derive_from_key(
      HKDF_DERIVED_KEY_SIZE,
      HKDF_KEY_ID,
      HKDF_CONTEXT,
      sharedKey
    );

    // Encrypt data using ChaCha20-Poly1305
    // Generate nonce
    const nonceBytes = sodium.randombytes_buf(CHACHA20_POLY1305_NONCEBYTES);

    const message = JSON.stringify({ temperature, humidity });
    const messageBytes = sodium.from_string(message);

    const ciphertext = sodium.crypto_aead_chacha20poly1305_ietf_encrypt(
      messageBytes,
      null, // No additional data
      null, // Secret nonce (not used)
      nonceBytes,
      derivedKey
    );

    const end = performance.now();

    console.log(`Encryption Time: ${(end - start).toFixed(2)} ms`);

    return {
      ciphertext: sodium.to_base64(ciphertext, sodium.base64_variants.ORIGINAL),
      nonce: sodium.to_base64(nonceBytes, sodium.base64_variants.ORIGINAL),
      devicePublicKey: sodium.to_base64(
        deviceKeyPair.publicKey,
        sodium.base64_variants.ORIGINAL
      ),
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(`Encryption failed: ${error?.message}`);
  }
}

export const decryptSensorData = async (
  encryptedData: EncryptSensorDataResponse,
  deviceKeyPair: { publicKey: Uint8Array; privateKey: Uint8Array },
  serverPublicKey: Uint8Array
) => {
  const start = performance.now();
  try {
    await sodium.ready;

    // Decode inputs
    const ciphertext = sodium.from_base64(
      encryptedData.cipherText,
      sodium.base64_variants.ORIGINAL
    );
    const nonce = sodium.from_base64(
      encryptedData.nonce,
      sodium.base64_variants.ORIGINAL
    );

    const sessionKeys = sodium.crypto_box_beforenm(
      serverPublicKey,
      deviceKeyPair.privateKey
    );

    console.log("Device PK (hex):", sodium.to_hex(deviceKeyPair.publicKey));
    console.log("Server PK (hex):", sodium.to_hex(serverPublicKey));
    console.log("SharedTx (hex):", sodium.to_hex(sessionKeys));
    // Uses the receive key for client-to-server encryption
    const sharedKey = sessionKeys;

    // Derive encryption key using HKDF
    const derivedKey = sodium.crypto_kdf_derive_from_key(
      32, // 256-bit key
      1, // Key ID
      "climates",
      sharedKey
    );

    console.log(sodium.to_hex(derivedKey));

    const decryptedBytes = sodium.crypto_aead_chacha20poly1305_ietf_decrypt(
      null,
      ciphertext,
      null,
      nonce,
      derivedKey
    );
    const end = performance.now();

    // Parse decrypted data
    const decryptedMessage = sodium.to_string(decryptedBytes);
    console.log(`Decryption Time: ${(end - start).toFixed(2)} ms`);
    return JSON.parse(decryptedMessage);
  } catch (error: any) {
    console.log(error);

    throw new Error(`Decryption failed: ${error.message}`);
  }
};
