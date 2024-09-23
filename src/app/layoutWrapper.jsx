
import Nav from "./components/Nav";

export default function LayoutWrapper({ children }) {
    return (
        <div>
            <Nav />
            {children}
        </div>
    );
}
