import sodium from "libsodium-wrappers";

interface EncryptSensorDataResult {
  ciphertext: string;
  nonce: string;
  devicePublicKey: string;
  salt: string;
  info: string;
  additionalData?: string;
}

export async function encryptSensorData(
  temperature: number,
  humidity: number,
  // serverPublicKey: Uint8Array, // Provided by the backend
  // deviceKeyPair: { publicKey: Uint8Array; privateKey: Uint8Array }, // Reused device key pair
  info: string = "device-123-session1" // Configurable context
): Promise<EncryptSensorDataResult> {
  try {
    await sodium.ready;

    // Device key pair generation
    const deviceKeyPair = sodium.crypto_kx_keypair();

    // Simulate server public key (replace with real one from backend)
    const serverKeyPair = sodium.crypto_kx_keypair();

    // Derive shared secret using key exchange (Elliptic Curve Diffie Hellman)
    const sessionKeys = sodium.crypto_kx_client_session_keys(
      deviceKeyPair.publicKey,
      deviceKeyPair.privateKey,
      serverKeyPair.publicKey
    );

    // Uses the receive key for client-to-server encryption
    const sharedKey = sessionKeys.sharedRx;

    // Derive encryption key using HKDF
    const salt = sodium.randombytes_buf(16);
    const derivedKey = sodium.crypto_kdf_derive_from_key(
      32, // 256-bit key
      1, // Key ID
      info,
      sharedKey
    );

    // Encrypt data using ChaCha20-Poly1305 (IETF variant)
    const nonce = sodium.randombytes_buf(
      sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES
    ); // 12-byte nonce
    const message = JSON.stringify({ temperature, humidity });
    const messageBytes = sodium.from_string(message);

    const ciphertext = sodium.crypto_aead_chacha20poly1305_ietf_encrypt(
      messageBytes,
      null,
      null, // nsec (not used)
      nonce,
      derivedKey
    );

    return {
      ciphertext: sodium.to_base64(ciphertext),
      nonce: sodium.to_base64(nonce),
      devicePublicKey: sodium.to_base64(deviceKeyPair.publicKey),
      salt: sodium.to_base64(salt),
      info, // Return as plain string
    };
  } catch (error: any) {
    throw new Error(`Encryption failed: ${error?.message}`);
  }
}
