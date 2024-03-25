import Button from "@/components/button"
import Input from "@/components/input"
import { routes } from "@/routes"
import Link from "next/link"

const Index = () => {
    return <div className="flex flex-col justify-center h-full gap-3">
        <p className="text-xl text-center mb-4">Send Verification Code</p>
        <Input placeholder="Email" />
        <Button to={routes.auth.resetPassword.confirm()} className="mt-3 w-full">Send Code</Button>
        <Link href={routes.auth.login()}>
            <p className="text-sm text-center"><u>Back to login</u></p>
        </Link>
    </div>
}

export default Index