import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { QRConfig } from "./QRGenerator";
import { toast } from "@/hooks/use-toast";

interface QRPreviewPanelProps {
    config: QRConfig;
}

const QRPreviewPanel = ({ config }: QRPreviewPanelProps) => {
    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQR = (format: "png" | "svg") => {
        if (!qrRef.current) return;

        const svg = qrRef.current.querySelector("svg");
        if (!svg) return;

        if (format === "svg") {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "qrcode.svg";
            link.click();
            URL.revokeObjectURL(url);
            toast({
                title: "Downloaded",
                description: "QR code saved as SVG",
            });
        } else {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const svgData = new XMLSerializer().serializeToString(svg);
            const img = new Image();
            const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(blob);

            img.onload = () => {
                canvas.width = config.size;
                canvas.height = config.size;
                ctx.drawImage(img, 0, 0, config.size, config.size);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "qrcode.png";
                        link.click();
                        URL.revokeObjectURL(url);
                        toast({
                            title: "Downloaded",
                            description: "QR code saved as PNG",
                        });
                    }
                });
                URL.revokeObjectURL(url);
            };

            img.src = url;
        }
    };

    return (
        <div className="space-y-6 bg-card border border-border rounded-xl p-6">
            <div className="border-b border-border pb-4">
                <h2 className="text-xl font-semibold text-foreground">Preview</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Live preview of your QR code
                </p>
            </div>

            <div
                ref={qrRef}
                className="bg-muted/30 rounded-lg p-8 flex items-center justify-center min-h-[320px]"
            >
                {config.text ? (
                    <QRCodeSVG
                        value={config.text}
                        size={config.size}
                        level={config.errorCorrection}
                        fgColor={config.fgColor}
                        bgColor={config.bgColor}
                        marginSize={config.margin}
                        imageSettings={
                            config.includeImage && config.imageUrl
                                ? {
                                    src: config.imageUrl,
                                    height: config.imageSize,
                                    width: config.imageSize,
                                    excavate: true,
                                }
                                : undefined
                        }
                    />
                ) : (
                    <p className="text-muted-foreground text-center">
                        Enter content to generate QR code
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    onClick={() => downloadQR("png")}
                    disabled={!config.text}
                    className="w-full"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG
                </Button>
                <Button
                    onClick={() => downloadQR("svg")}
                    disabled={!config.text}
                    variant="outline"
                    className="w-full"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download SVG
                </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center">
                {config.size}×{config.size}px • {config.errorCorrection} error correction
            </div>
        </div>
    );
};

export default QRPreviewPanel;
