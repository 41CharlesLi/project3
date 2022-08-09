import "./App.css";
import Header from "./Header";
import Form from "./Form";
import BlogSection from "./BlogSection";

function App() {
    return (
        <div className="App">
            <header>
                <Header />
            </header>
            <section className="main">
                <div className="wrapper">
                    <div className="mainSection">
                        <BlogSection />
                        <Form />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
