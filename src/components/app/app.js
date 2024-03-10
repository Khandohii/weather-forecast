
import './App.scss';

import Header from '../appHeader/appHeader';
import Day from '../day/day';
import Footer from '../appFooter/appFooter';

export default function App() {
    return (
        <div className="app">
            <Header />

            <div className="cont">
                <Day />
            </div>
            <Footer />
        </div>
    );
}