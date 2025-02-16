import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useTokenContext } from "../../context/userContext";
import DATABASE_API from "../../services/database.API";
import { useRouter } from "expo-router";
import styleFormulario from "./formularioStyle";

function Formulario() {
  const { token } = useTokenContext();
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const router = useRouter();

  const postCarro = async () => {
    try {
      if (!brand || !name || !hp) {
        alert("tem que todos todos os campos ");
        return;
      }

      const hpNumber = parseInt(hp);
      if (isNaN(hpNumber)) {
        alert("erro no HP");
        return;
      }

      const resultado = await DATABASE_API.post(
        "/api/collections/cars/records",
        {
          brand,
          name,
          hp: hpNumber,
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
      //console.log(`ERROR: ${error}`);
    }
  };

  return (
    <View style={styleFormulario.card}>
      <View >
        <Text style={styleFormulario.header}>Cadastrar Novo Carro</Text>
      </View>
      <View>
        <View style={styleFormulario.containerTextInput}>
          <Text style={styleFormulario.label}>Marca Do Carro</Text>
          <TextInput
            value={brand}
            onChangeText={setBrand}
            placeholder="Marca do Carro"
            style ={styleFormulario.textInput}
          />
        </View>
        <View style={styleFormulario.containerTextInput}>
          <Text style={styleFormulario.label}>Nome</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome do Carro"
            style ={styleFormulario.textInput}
          />
        </View>
        <View style={styleFormulario.containerTextInput}>
          <Text style={styleFormulario.label}>HP:</Text>
          <TextInput
            value={hp}
            onChangeText={setHp}
            keyboardType="numeric"
            placeholder="Potência em HPS"
            style ={styleFormulario.textInput}
          />
        </View>
        <Button title="Cadastrar Carro" onPress={postCarro} />
      </View>
    </View>
  );
}

export default Formulario;
