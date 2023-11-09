<script setup>
onMounted(()=>{
    
    const wrapCharSpan = function(str){
        return [...str].map(char => `<span>${char}</span>`).join('');
        }
        const targets = document.querySelectorAll('.js-span-wrap-text');
        targets.forEach( (target) => {
        target.innerHTML = wrapCharSpan(target.textContent);
    })

     // // スクロール検知(画面に入ったらクラス付与 && 外す)
    let scrollCheck = document.querySelectorAll('.js-io');
    const cb = function(entries){
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('is-inview');
            } 
        });
    }
    
    const options = {
        threshold: .2
    }
    
    const io = new IntersectionObserver(cb,options);
    
    scrollCheck.forEach(v => {
        io.observe(v);
    });
});
    // import { useField } from 'vee-validate';
    // import * as yup from 'yup';

    // const schema = yup.object({
    // name: yup
    //     .string()
    //     .required("この項目は必須です")
    //     .min(8, "８文字以上で入力してください"),
    // email: yup
    //     .string()
    //     .required("この項目は必須です")
    //     .email("メールアドレスの形式で入力してください"),
    // });

    // const { errors } = useForm({
    // validationSchema: schema,
    // });

    // const { value: name } = useField('name');
    // const { value: email } = useField('email');

</script>

<template>
    <Header />
    <main id="contact">
        <article>
            <section>
                <div class="md-container">
                    <div class="subpage_fv">
                        <h2 class="js-span-wrap-text js-io">Contact</h2>
                        <span class="js-io">お問い合わせ</span>
                    </div>
                    <p>お気軽にお問い合わせください。</p>
                    <form 
                        name="contact" 
                        action="/complete" 
                        method="POST" 
                        data-netlify-recaptcha="true"
                        data-netlify="true" 
                        class="form_wrapper">
                        <dl class="form_box">
                            <dt><span class="required">必須</span><label for="form-name">お名前</label></dt>
                            <dd>
                                <input type="text" name="name" id="form-name" class="is-half" required>
                                <p>例）山田太郎</p>
                                <!-- <p>{{ erros.name }}</p> -->
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="required">必須</span><label for="form-email">メールアドレス</label></dt>
                            <dd>
                                <input type="email" name="email" id="form-email" class="is-half" required >
                                <p>例）portfolio@mail.com</p>
                                <!-- <p>{{ errors.email }}</p> -->
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="non-required">任意</span><label for="form-tel">電話番号</label></dt>
                            <dd>
                                <input type="tel" name="tel" id="form-tel" class="is-half">
                                <p>例）07001234567(*ハイフンなしでご記入ください)</p>
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="required">必須</span><label for="form-textarea">お問い合わせ内容</label></dt>
                            <dd>
                                <!-- <p v-if="errors.textarea">{{ errors.textarea }}</p> -->
                                <textarea name="textarea"  id="form-textarea" required></textarea>
                                <p>お問い合わせ内容をお書き下さい。</p>
                            </dd>
                        </dl>
                        <div data-netlify-recaptcha="true"></div>

                        <div class="btn_wrapper"><button type="submit" class="btn">送信する</button></div>

                        
                    </form>
                </div>
            </section>
        </article>
    </main>
</template>

