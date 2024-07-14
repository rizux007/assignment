import { ActionFunction, Form, Link, redirect } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitBtn, FormInput } from "@/components";
import { customFetch } from "@/utils";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

export const action: ActionFunction = async ({
  request,
}): Promise<Response | null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (!data.username || !data.password || !data.email) {
    toast({ description: "Veuillez remplir tous les champs !" });
    return null;
  }
  try {
    await customFetch.post("/auth/local/register", data);
    toast({ description: "Inscription réussie" });
    return redirect("/login");
  } catch (error) {
    // console.log(error);
    const errorMsg =
      error instanceof AxiosError
        ? error.response?.data.error.message
        : "Echec d'inscrpition";
    toast({ description: errorMsg });

    return null;
  }
};

function Register() {
  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center">S'inscrire</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <FormInput type="text" label="Nom d'utilisateur" name="username" />
            <FormInput type="email" label="Email" name="email" />
            <FormInput type="password" label="Mot de passe" name="password" />
            <SubmitBtn text="S'inscrire" className="w-full mt-4" />
            <p className="text-center mt-4">
              Déja un compte ?
              <Button type="button" asChild variant="link">
                <Link to="/login">Se Connecter</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
export default Register;
