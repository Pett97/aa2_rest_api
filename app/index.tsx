import { Redirect } from "expo-router";
import { Button, Text } from "react-native";
import { useTokenContext } from "../src/context/userContext";
import DATABASE_API from "../src/services/database.API";


export default function Index() {
  const { token, setToken } = useTokenContext();

  if (token) return <Redirect href="/home/Home" />;

  return (
    <>
      <Text>
        verificar se tem o usuario criado no PocketBase
      </Text>

      <Button
        title="login"
        onPress={async () => {
          try {
            const result = await DATABASE_API.post(
              "/api/collections/users/auth-with-password",
              {
                identity: "cypressPett@gmail.com",
                password: "pett123456",
              }
            );

            setToken(result.data.token);
          } catch (error) {
            //console.log(`ERRO NO INDEX ERRO=> ${error}`)
          }
        }}
      />
    </>
  );
}