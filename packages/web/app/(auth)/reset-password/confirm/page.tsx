import Button from "@/components/button"
import Input from "@/components/input"
import { routes } from "@/routes"
import Link from "next/link"

const Index = () => {
    return <div className="flex flex-col justify-center h-full gap-3">
        <p className="text-xl text-center mb-4">Confirm Verification Code</p>
        <Input placeholder="Code" />
        <Button to={routes.auth.login()} className="mt-3 w-full">Verify</Button>
        <Link href={routes.auth.login()}>
            <p className="text-sm text-center"><u>Back to login</u></p>
        </Link>
    </div>
}

export default Index