import logo from "@/assets/logo.png";

const Header = () => {
    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="GlitchQR Logo" className="h-20 w-auto object-contain" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
