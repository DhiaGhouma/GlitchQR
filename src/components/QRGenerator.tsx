import { useState } from "react";
import QRInputPanel from "./QRInputPanel";
import QRPreviewPanel from "./QRPreviewPanel";

export interface QRConfig {
    text: string;
    size: number;
    margin: number;
    fgColor: string;
    bgColor: string;
    errorCorrection: "L" | "M" | "Q" | "H";
    includeImage: boolean;
    imageUrl: string;
    imageSize: number;
}

const QRGenerator = () => {
    const [config, setConfig] = useState<QRConfig>({
        text: "https://glitchqr.dev",
        size: 256,
        margin: 2,
        fgColor: "#000000",
        bgColor: "#ffffff",
        errorCorrection: "M",
        includeImage: false,
        imageUrl: "",
        imageSize: 50,
    });

    return (
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <QRInputPanel config={config} setConfig={setConfig} />
            <QRPreviewPanel config={config} />
        </div>
    );
};

export default QRGenerator;
