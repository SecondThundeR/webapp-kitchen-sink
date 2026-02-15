import { BanIcon, ScanFaceIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { booleanToYesNoString } from "@/utils/format";
import { useBiometricManager } from "./hooks";

export const BiometricManagerPage = () => {
  const {
    isInited,
    isBiometricAvailable,
    isAccessGranted,
    isAccessRequested,
    deviceId,
    biometricType,
    isBiometricTokenSaved,
    requestAccess,
    authenticate,
    openSettings,
    updateToken,
  } = useBiometricManager();

  const [logs, setLogs] = useState<string[]>([]);
  const [biometricToken, setBiometricToken] = useState("");
  const [retrievedSecret, setRetrievedSecret] = useState<string | null>(null);

  const addLog = (msg: string) =>
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  if (!isInited) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Spinner className="size-8" />
        <p className="leading-7 mt-3">Initializing BiometricManager...</p>
      </div>
    );
  }

  if (!isBiometricAvailable) {
    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BanIcon />
          </EmptyMedia>
          <EmptyTitle>Biometrics Not Available</EmptyTitle>
          <EmptyDescription>
            This device does not have a sensor, or you are running on Desktop
            <br />
            Device ID: {deviceId || "Unknown"}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const handleRequest = async () => {
    addLog("Requesting access...");
    const granted = await requestAccess();
    addLog(`Access request finished. Granted: ${granted}`);
  };

  const handleSaveSecret = async () => {
    if (!biometricToken) {
      try {
        addLog("Removing secret from secure storage...");
        await updateToken("");
        addLog("Success! Secret removed");
      } catch (e) {
        addLog(`Error removing secret: ${e}`);
      }
      return;
    }

    try {
      addLog("Saving secret to secure storage...");
      await updateToken(biometricToken);
      addLog("Success! Secret saved");
      setBiometricToken("");
    } catch (e) {
      addLog(`Error saving secret: ${e}`);
    }
  };

  const handleAuthenticate = async () => {
    try {
      addLog("Scanning face/fingerprint...");
      const token = await authenticate("Verify Identity");

      if (token) {
        addLog("Auth Success! Token retrieved");
        setRetrievedSecret(token);
      } else {
        addLog("Auth Success! (No token was stored)");
        setRetrievedSecret("");
      }
    } catch (e) {
      addLog(`Authentication Failed or Cancelled. Error: ${e}`);
    }
  };

  const handleOpenSettings = async () => {
    try {
      addLog("Opening biometrics settings...");
      await openSettings();
      addLog("Successfully opened biometrics settings");
    } catch (e) {
      addLog(`Failed to open biometrics settings. Error: ${e}`);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full pb-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Biometric Manager Playground
      </h1>
      <h2 className="text-xl">State</h2>
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>isInited</CardTitle>
          </CardHeader>
          <CardContent>{booleanToYesNoString(isInited)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>isBiometricAvailable</CardTitle>
          </CardHeader>
          <CardContent>
            {String(booleanToYesNoString(isBiometricAvailable))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>biometricType</CardTitle>
          </CardHeader>
          <CardContent>{String(biometricType)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="wrap-anywhere">
              isBiometricTokenSaved
            </CardTitle>
          </CardHeader>
          <CardContent>
            {booleanToYesNoString(isBiometricTokenSaved)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>isAccessGranted</CardTitle>
          </CardHeader>
          <CardContent>{booleanToYesNoString(isAccessGranted)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>isAccessRequested</CardTitle>
          </CardHeader>
          <CardContent>{booleanToYesNoString(isAccessRequested)}</CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>deviceId</CardTitle>
          </CardHeader>
          <CardContent className="wrap-anywhere">
            {String(deviceId)}
          </CardContent>
        </Card>
      </div>
      <h2 className="text-xl">Actions</h2>
      {isAccessGranted && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Secure Storage</CardTitle>
              <CardDescription>
                Enter a secret (e.g., API Key) to encrypt inside the device
                hardware
                <br />
                To remove the token, leave this field empty
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                id="biometric-token"
                value={biometricToken}
                onChange={(e) => setBiometricToken(e.currentTarget.value)}
                placeholder="Enter biometric token"
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSaveSecret}>
                Save
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verify & Retrieve</CardTitle>
              <CardDescription>
                Scan your biometrics to unlock the secret
              </CardDescription>
            </CardHeader>
            {retrievedSecret && (
              <CardContent className="flex flex-col gap-2">
                <small className="text-sm leading-none font-medium">
                  Decrypted Secret:
                </small>
                <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                  {retrievedSecret}
                </code>
              </CardContent>
            )}
            <CardFooter>
              <Button className="w-full" onClick={handleAuthenticate}>
                Authenticate
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {!isAccessGranted && isAccessRequested && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BanIcon />
            </EmptyMedia>
            <EmptyTitle>Access was denied</EmptyTitle>
            <EmptyDescription>
              Please open settings to enable biometrics for this bot
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row flex-wrap justify-center gap-2">
            <Button onClick={handleOpenSettings}>Open Settings</Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </EmptyContent>
          <p className="text-sm text-muted-foreground">
            After enabling biometrics via opened settings, refresh this page to
            re-init BiometricManager
          </p>
        </Empty>
      )}

      {!isAccessRequested && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ScanFaceIcon />
            </EmptyMedia>
            <EmptyTitle>No access for biometrics usage</EmptyTitle>
            <EmptyDescription>
              Use button below to enable biometrics in this mini app
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={handleRequest}>Enable Biometrics</Button>
          </EmptyContent>
        </Empty>
      )}

      <h2 className="text-xl">Logs</h2>
      <div className="h-32 overflow-y-auto bg-black text-green-400 p-2 text-xs font-mono rounded-md">
        {logs.length === 0 && (
          <span className="opacity-50">{"// Events will appear here..."}</span>
        )}
        {logs.map((log, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Fine here
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
};
