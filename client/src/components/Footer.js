import React from "react";

export default function Footer() {
    return (
        <footer>
            <div id="footer-content" style={{display: "flex"}}>
                <section>
                    <h3>People</h3>
                    <ul>
                        <li><a href="https://github.com/laurasierra17">Laura</a></li>
                        <li><a href="https://github.com/mardill">Mary</a></li>
                        <li><a href="https://github.com/lshillman">Luke</a></li>
                    </ul>
                </section>
                <section>
                    <h3>Legal</h3>
                    <p>Agrarify &copy; 2022, All Rights Reserved. Codebase uses the Hippcratic License, v3.0 (don't be evil). See also: <a href="https://www.privacypolicygenerator.info/live.php?token=LjuEA1DWsV3iCW8inX6xLh7OG7A4HXWc">Privacy Policy</a></p>
                </section>
            </div>
        </footer>
    )

}