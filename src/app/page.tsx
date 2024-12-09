import { redirect } from 'next/navigation'


export default function RedirectHome() {
    redirect("/sign-in");
}