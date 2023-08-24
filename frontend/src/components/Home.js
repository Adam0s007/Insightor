
import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-page">

            <header className="header">
                <h1>Witaj w Insightor – Twoim źródle nowych perspektyw!</h1>
            </header>

            <section className="introduction">
                <p>Rozwijaj się, ucz się i dziel się swoimi przemyśleniami...</p>
                <p>Czy jesteś ciekawy świata, ludzi i różnorodnych doświadczeń? Insightor to miejsce...</p>
            </section>

            <section className="how-it-works">
                <h2>Jak działa Insightor:</h2>
                <ul>
                    <li>Opublikuj Swój Blog: Czy masz ciekawe myśli...</li>
                    <li>Oceniaj i Komentuj: Twoja opinia ma znaczenie!</li>
                    <li>Bądź częścią społeczności: W Insightor każdy ma głos.</li>
                </ul>
            </section>

            <blockquote className="motivational-quote">
                "W jednym zdaniu kryje się cały świat. W jednym spojrzeniu jest nieskończoność. Odkrywaj, ucz się i dziel się w Insightor."
            </blockquote>

            <section className="call-to-action">
                <p>Chcesz dołączyć do społeczności Insightor? <button>Zarejestruj się teraz</button> i zacznij swoją podróż!</p>
            </section>

            <section className="contact">
                <h2>Skontaktuj się z nami:</h2>
                <form>
                    <label>
                        Imię i nazwisko:
                        <input type="text" name="name" />
                    </label>
                    <label>
                        Adres e-mail:
                        <input type="email" name="email" />
                    </label>
                    <label>
                        Wiadomość:
                        <textarea name="message"></textarea>
                    </label>
                    <input type="submit" value="Wyślij" />
                </form>
                <p>Wysyłając formularz, zgadzasz się na przetwarzanie Twoich danych...</p>
            </section>

            <footer className="footer">
                <div className="address">
                    <p>Adres: [Ulica i numer], [Kod pocztowy], [Miasto], [Kraj]</p>
                    <p>E-mail: kontakt@insightor.com</p>
                    <p>Telefon: +48 123 456 789</p>
                </div>
                <div className="social-media">
                    {/* Ikony mediów społecznościowych */}
                    <a href="#facebook"><img src="path_to_facebook_icon" alt="Facebook" /> Facebook</a>
                    <a href="#instagram"><img src="path_to_instagram_icon" alt="Instagram" /> Instagram</a>
                    <a href="#twitter"><img src="path_to_twitter_icon" alt="Twitter" /> Twitter</a>
                    <a href="#linkedin"><img src="path_to_linkedin_icon" alt="LinkedIn" /> LinkedIn</a>
                </div>
                <div className="useful-links">
                    <a href="#terms">Regulamin</a>
                    <a href="#privacy">Polityka prywatności</a>
                    <a href="#faq">FAQ</a>
                </div>
                <p>© 2023 Insightor. Wszelkie prawa zastrzeżone.</p>
            </footer>
        </div>
    );
}

export default Home;
