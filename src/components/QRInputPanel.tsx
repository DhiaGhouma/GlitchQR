import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { QRConfig } from "./QRGenerator";
import { Shuffle, Image } from "lucide-react";

interface QRInputPanelProps {
    config: QRConfig;
    setConfig: (config: QRConfig) => void;
}

const presets = [
    { id: "classic", name: "Classic", fg: "#000000", bg: "#ffffff" },
    { id: "inverted", name: "Inverted", fg: "#ffffff", bg: "#000000" },
    { id: "ocean", name: "Ocean Blue", fg: "#0066cc", bg: "#e6f2ff" },
    { id: "forest", name: "Forest", fg: "#1a5c1a", bg: "#e8f5e8" },
    { id: "sunset", name: "Sunset", fg: "#cc3300", bg: "#fff5e6" },
    { id: "purple", name: "Purple", fg: "#6600cc", bg: "#f5e6ff" },
    { id: "dark-teal", name: "Dark Teal", fg: "#00b3b3", bg: "#1a1a2e" },
    { id: "gold", name: "Gold", fg: "#b8860b", bg: "#fffef0" },
];

const QRInputPanel = ({ config, setConfig }: QRInputPanelProps) => {
    const handlePresetChange = (presetId: string) => {
        const preset = presets.find((p) => p.id === presetId);
        if (preset) {
            setConfig({
                ...config,
                fgColor: preset.fg,
                bgColor: preset.bg,
            });
        }
    };

    const handleRandomPreset = () => {
        const randomPreset = presets[Math.floor(Math.random() * presets.length)];
        handlePresetChange(randomPreset.id);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setConfig({
                    ...config,
                    imageUrl: reader.result as string,
                    includeImage: true,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6 bg-card border border-border rounded-xl p-6">
            <div className="border-b border-border pb-4">
                <h2 className="text-xl font-semibold text-foreground">Settings</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Customize your QR code
                </p>
            </div>

            <div className="space-y-5">
                {/* Text Input */}
                <div className="space-y-2">
                    <Label htmlFor="qr-text" className="text-foreground">
                        Content
                    </Label>
                    <Input
                        id="qr-text"
                        value={config.text}
                        onChange={(e) => setConfig({ ...config, text: e.target.value })}
                        placeholder="Enter text or URL..."
                        className="bg-input border-border"
                    />
                </div>

                {/* Color Preset */}
                <div className="space-y-2">
                    <Label className="text-foreground">Color Preset</Label>
                    <Select onValueChange={handlePresetChange}>
                        <SelectTrigger className="bg-input border-border">
                            <SelectValue placeholder="Choose a preset..." />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                            {presets.map((preset) => (
                                <SelectItem key={preset.id} value={preset.id}>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-4 h-4 rounded border"
                                            style={{ backgroundColor: preset.fg }}
                                        />
                                        <div
                                            className="w-4 h-4 rounded border"
                                            style={{ backgroundColor: preset.bg }}
                                        />
                                        <span>{preset.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fg-color" className="text-foreground">
                            Foreground
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="fg-color"
                                type="color"
                                value={config.fgColor}
                                onChange={(e) =>
                                    setConfig({ ...config, fgColor: e.target.value })
                                }
                                className="w-12 h-10 p-1 cursor-pointer"
                            />
                            <Input
                                value={config.fgColor}
                                onChange={(e) =>
                                    setConfig({ ...config, fgColor: e.target.value })
                                }
                                className="bg-input border-border font-mono text-sm"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bg-color" className="text-foreground">
                            Background
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="bg-color"
                                type="color"
                                value={config.bgColor}
                                onChange={(e) =>
                                    setConfig({ ...config, bgColor: e.target.value })
                                }
                                className="w-12 h-10 p-1 cursor-pointer"
                            />
                            <Input
                                value={config.bgColor}
                                onChange={(e) =>
                                    setConfig({ ...config, bgColor: e.target.value })
                                }
                                className="bg-input border-border font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Size */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <Label className="text-foreground">Size</Label>
                        <span className="text-sm text-muted-foreground">{config.size}px</span>
                    </div>
                    <Slider
                        value={[config.size]}
                        onValueChange={([value]) => setConfig({ ...config, size: value })}
                        min={128}
                        max={512}
                        step={8}
                        className="w-full"
                    />
                </div>

                {/* Margin */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <Label className="text-foreground">Margin</Label>
                        <span className="text-sm text-muted-foreground">{config.margin} modules</span>
                    </div>
                    <Slider
                        value={[config.margin]}
                        onValueChange={([value]) => setConfig({ ...config, margin: value })}
                        min={0}
                        max={8}
                        step={1}
                        className="w-full"
                    />
                </div>

                {/* Error Correction */}
                <div className="space-y-2">
                    <Label className="text-foreground">Error Correction</Label>
                    <Select
                        value={config.errorCorrection}
                        onValueChange={(value: "L" | "M" | "Q" | "H") =>
                            setConfig({ ...config, errorCorrection: value })
                        }
                    >
                        <SelectTrigger className="bg-input border-border">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                            <SelectItem value="L">Low (7%) - Smallest</SelectItem>
                            <SelectItem value="M">Medium (15%) - Default</SelectItem>
                            <SelectItem value="Q">Quartile (25%)</SelectItem>
                            <SelectItem value="H">High (30%) - Best for logos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Logo/Image */}
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                        <Label className="text-foreground">Center Logo</Label>
                        <Switch
                            checked={config.includeImage}
                            onCheckedChange={(checked) =>
                                setConfig({ ...config, includeImage: checked })
                            }
                        />
                    </div>

                    {config.includeImage && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="logo-upload" className="cursor-pointer">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-sm">
                                        <Image className="h-4 w-4" />
                                        Upload Image
                                    </div>
                                </Label>
                                <Input
                                    id="logo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label className="text-foreground text-sm">Logo Size</Label>
                                    <span className="text-sm text-muted-foreground">{config.imageSize}px</span>
                                </div>
                                <Slider
                                    value={[config.imageSize]}
                                    onValueChange={([value]) => setConfig({ ...config, imageSize: value })}
                                    min={20}
                                    max={80}
                                    step={5}
                                    className="w-full"
                                />
                            </div>
                        </>
                    )}
                </div>

                <Button
                    onClick={handleRandomPreset}
                    variant="outline"
                    className="w-full"
                >
                    <Shuffle className="mr-2 h-4 w-4" />
                    Random Colors
                </Button>
            </div>
        </div>
    );
};

export default QRInputPanel;
