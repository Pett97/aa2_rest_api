import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DATABASE_API from "../../services/database.API";
import { useTokenContext } from "../../context/userContext";
import { useRouter } from "expo-router";
import styles from "./editar.style";

interface Carro {
  id: string;
  brand: string;
  name: string;
  hp: number;
}

function EditarCarro() {
  const { id } = useLocalSearchParams();
  const { token } = useTokenContext();
  const [carro, setCarro] = useState<Carro | null>(null);
  const router = useRouter();

  const [novoNome, setNovoNome] = useState("");
  const [novaMarca, setNovaMarca] = useState("");
  const [novoHp, setNovoHp] = useState("");

  const atualizarCarro = async () => {
    try {
      await DATABASE_API.patch(
        `/api/collections/cars/records/${id}`,
        {
          name: novoNome || carro?.name,
          brand: novaMarca || carro?.brand,
          hp: novoHp ? parseInt(novoHp) : carro?.hp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/home/Home");
    } catch (error) {
      console.log(`Erro ao atualizar carro: ${error}`);
    }
  };

  useEffect(() => {
    const buscarCarro = async () => {
      try {
        const resultado = await DATABASE_API.get(
          `/api/collections/cars/records/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCarro(resultado.data);
        setNovoNome(resultado.data.name);
        setNovaMarca(resultado.data.brand);
        setNovoHp(String(resultado.data.hp));
      } catch (error) {
        console.log(`Erro ao buscar carro: ${error}`);
      }
    };

    if (id) {
      buscarCarro();
    }
  }, [id, token]);

  if (!carro) {
    return <Text>Carro não encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.textInput}
          value={novaMarca}
          onChangeText={setNovaMarca}
          placeholder="Marca"
        />
        <TextInput
          style={styles.textInput}
          value={novoNome}
          onChangeText={setNovoNome}
          placeholder="Nome"
        />
        <TextInput
          style={styles.textInput}
          value={novoHp}
          onChangeText={setNovoHp}
          keyboardType="numeric"
          placeholder="Potência (HP)"
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title="Voltar"
          onPress={() => {
            router.push("/home/Home");
          }}
        />
        <Button title="Atualizar" onPress={atualizarCarro} />
      </View>
    </View>
  );
}

export default EditarCarro;
