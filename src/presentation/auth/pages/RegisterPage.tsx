import { Text } from "../../components/Text";
import { Link } from "react-router-dom";
import { FormUserRegister } from "../../components/FormRegister";

export const RegisterPage = () => {
    const onSuccess = (created: boolean) => {
        if (created) {
            console.log('CREATED...');
        }
    }

    return (
        <article>
            <h1 className={`form-container_title`}>Create account</h1>
            <Text className="form-container_text">Fill in the fields below to sign into.</Text>
            <FormUserRegister onSuccess={onSuccess} />
            <div style={{ margin: '1rem 0' }} className="separator">
                <Text children="o" />
            </div>
            <Text className="form-container_text">Already have an account?<Link replace to={'/auth/login'}><strong style={{ marginLeft: '.5rem' }}>Go sign in</strong></Link></Text>
        </article >
    )
}