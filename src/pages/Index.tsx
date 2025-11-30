import Header from "@/components/Header";
import QRGenerator from "@/components/QRGenerator";
import Footer from "@/components/Footer";

const Index = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-1">
                <QRGenerator />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
