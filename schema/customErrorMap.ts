import { type ErrorMapCtx, z} from 'zod'

const customErrorMap = (issue: any, ctx: ErrorMapCtx) => {
    console.log('Issue:', issue);
    switch (issue.code) {
        case z.ZodIssueCode.too_small:
        if(issue.minimum === 1) {
            return { message: "入力必須項目です" }
        }
        return { message: `${issue.minimum}以上入力してください` }
        case z.ZodIssueCode.invalid_string: 
        if (issue.validation === "email") {
            return { message: "メールアドレスの形式で入力してください" };
        }
        case z.ZodIssueCode.custom:
        if (issue.path?.[0] === "tel") {
            return {message: "電話番号の形式で入力してください"};
        }
        default:
        return { message: ctx.defaultError }
    }
}

export default z.setErrorMap(customErrorMap)