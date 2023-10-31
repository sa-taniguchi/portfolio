<template>
    <main id="contact">
        <article>
            <section>
                <div class="lg-container">
                    <h2></h2>
                    <form name="contact" method="POST" data-netlify="true">
                    <p>
                        <label>Your Name: <input type="text" name="name" /></label>
                    </p>
                    <p>
                        <label>Your Email: <input type="email" name="email" /></label>
                    </p>
                    <p>
                        <label>Message: <textarea name="message"></textarea></label>
                    </p>
                    <p>
                        <button type="submit">Send</button>
                    </p>
                    </form>
                </div>
            </section>
        </article>
    </main>
</template>