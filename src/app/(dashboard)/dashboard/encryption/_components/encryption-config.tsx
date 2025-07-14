import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface EncryptionConfigCardProps {
  title: string;
  description?: string;
  onSave?: () => void;
  advanced?: boolean;
}

export function EncryptionConfigCard({
  title,
  description,
  onSave,
  advanced = false,
}: EncryptionConfigCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="keySize">Key Size</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[260px] text-sm">
                    Larger key sizes offer more security but may impact
                    performance on low-power devices.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select defaultValue="256" disabled>
              <SelectTrigger id="keySize">
                <SelectValue placeholder="Select key size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256">256-bit (Recommended)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="rounds">ChaCha Rounds</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[260px] text-sm">
                    More rounds increase security but reduce performance.
                    Industry standard is 20 rounds.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select defaultValue="20" disabled>
              <SelectTrigger id="rounds">
                <SelectValue placeholder="Select rounds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20 rounds (Standard)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="keyRotation">Key Rotation Policy</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[260px] text-sm">
                    Determines how often encryption keys are automatically
                    rotated for enhanced security.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select defaultValue="24">
              <SelectTrigger id="keyRotation">
                <SelectValue placeholder="Select rotation period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">Every 6 hours</SelectItem>
                <SelectItem value="12">Every 12 hours</SelectItem>
                <SelectItem value="24">Every 24 hours (Recommended)</SelectItem>
                <SelectItem value="48">Every 48 hours</SelectItem>
                <SelectItem value="168">Every 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {advanced && (
            <>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="nonceSize">Nonce Size</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[260px] text-sm">
                        Larger nonce sizes reduce the chance of nonce reuse,
                        which is critical for security.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select defaultValue="96">
                  <SelectTrigger id="nonceSize">
                    <SelectValue placeholder="Select nonce size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="64">64-bit</SelectItem>
                    <SelectItem value="96">96-bit (Recommended)</SelectItem>
                    <SelectItem value="128">128-bit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="authMode">Authentication Mode</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[260px] text-sm">
                        Defines how message authentication is performed
                        alongside encryption.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select defaultValue="poly1305">
                  <SelectTrigger id="authMode">
                    <SelectValue placeholder="Select authentication mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poly1305">
                      Poly1305 MAC (Recommended)
                    </SelectItem>
                    <SelectItem value="hmac">HMAC-SHA256</SelectItem>
                    <SelectItem value="gcm">GCM Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} className="ml-auto">
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}
