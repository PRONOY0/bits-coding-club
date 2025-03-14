import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" onClick={()=> signIn()}>
                  Login with Google <FcGoogle className="text-2xl lg:text-2xl"/>
                </Button>
              </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Button className="underline underline-offset-4" onClick={()=> signIn()}>
                Sign up with Google <FcGoogle className="text-2xl lg:text-2xl"/>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
