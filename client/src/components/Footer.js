import React from "react";

export default function Footer() {
    return (
        <footer>
            <div id="footer-content" style={{display: "flex", gap: "2rem"}}>
                <section>
                    <h3>About</h3>
                    <p>
                        Agrarify is developed and maintained by <a target="_blank" rel="noreferrer" href="https://github.com/lshillman">Luke</a>, <a target="_blank" rel="noreferrer" href="https://github.com/laurasierra17">Laura</a>, and 
                        <a target="_blank" rel="noreferrer" href="https://github.com/mardill">Mary</a> in their spare time. Why not join us in making the world more vegetative?
                        
                    </p>
                </section>
                <section>
                    <h3>Contact</h3>
                    <p>Found a bug? Have a feature request? Just want to say hi? We'd love to hear from you! Feel free to <a target="_blank" rel="noreferrer" href="https://forms.gle/ccK4NqdAYCCMstuy5">get in touch.</a></p>
                </section>
                <section>
                    <h3>Legal</h3>
                    <p>&copy; Agrarify 2022, All Rights Reserved. Codebase uses the <a target="_blank" rel="noreferrer" href="https://github.com/lshillman/agrarian-revolution/blob/main/LICENSE.md">Hippcratic License, v3.0</a> (don't be evil). See also: <a href="https://www.privacypolicygenerator.info/live.php?token=LjuEA1DWsV3iCW8inX6xLh7OG7A4HXWc">Privacy Policy</a></p>
                </section>
            </div>
        </footer>
    )

}