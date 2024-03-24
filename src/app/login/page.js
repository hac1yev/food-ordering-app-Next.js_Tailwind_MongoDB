import LoginForm from "@/components/layout/LoginForm";

const LoginPage = async () => {
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>
            <LoginForm />
        </section>
    );
};

export default LoginPage;