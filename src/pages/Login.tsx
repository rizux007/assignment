import {
  Form,
  Link,
  redirect,
  type ActionFunction,
  // useNavigate,
} from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitBtn, FormInput } from "@/components";
import { customFetch } from "@/utils";
import { toast } from "@/components/ui/use-toast";
import { type ReduxStore } from "@/store";
import { loginUser } from "@/features/user/userSlice";
// import { useAppDispatch } from "@/hooks";
import { AxiosResponse } from "axios";

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    if (!data.identifier || !data.password) {
      toast({ description: "Veuillez remplir tous les champs !" });
      return null;
    }
    try {
      const response: AxiosResponse = await customFetch.post(
        "/auth/local",
        data
      );
      const username = response.data.user.username;
      const jwt = response.data.jwt;
      store.dispatch(loginUser({ username, jwt }));
      return redirect("/");
    } catch (error) {
      console.log(error);
      toast({ description: "Erreur de connexion" });
      return null;
    }
  };

function Login() {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // const loginAsGuestUser = async (): Promise<void> => {
  //   try {
  //     const response: AxiosResponse = await customFetch.post("/auth/local", {
  //       identifier: "test@test.com",
  //       password: "secret",
  //     });
  //     const username = response.data.user.username;
  //     const jwt = response.data.jwt;
  //     dispatch(loginUser({ username, jwt }));
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     toast({ description: "Login Failed" });
  //   }
  // };
  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center">Se Connecter</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <FormInput
              type="email"
              placeholder="Entrer votre email"
              label="email"
              name="identifier"
            />
            <FormInput
              type="password"
              placeholder="Entrer votre mot de passe"
              name="password"
              label="Mot de passe"
            />
            <SubmitBtn text="Se Connecter" className="w-full mt-4" />
            {/* <Button
              type="button"
              variant="outline"
              onClick={loginAsGuestUser}
              className="w-full mt-4"
            >
              Mode invité
            </Button> */}
            <p className="text-center mt-4">
              Pas encore connecter?
              <Button type="button" asChild variant="link">
                <Link to="/register">S'inscrire</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
export default Login;
