import React, { useState, useCallback } from "react";
import { View, FlatList, Button, TextInput } from "react-native";
import DATABASE_API from "../../services/database.API";
import Car from "../../components/car/Car";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useTokenContext } from '../../context/userContext';

interface Carro {
  id: string;
  brand: string;
  name: string;
  hp: number;
}

function HomeList() {
  const { token } = useTokenContext();
  const [carros, setCarros] = useState<Carro[]>([]);
  const [carrosFiltrados, setCarrosFiltrados] = useState<Carro[]>([]);
  const [nomeMarca, setNomeMarca] = useState("");
  const router = useRouter();

  const deletarCarro = async (id: string) => {
    try {
      await DATABASE_API.delete(`/api/collections/cars/records/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCarros((prevCarros) => prevCarros.filter((carro) => carro.id !== id));
    } catch (error) {
      console.log(`Erro ao deletar carro: ${error}`);
    }
  };

  // Recarrega a lista de carros ao voltar para a tela
  useFocusEffect(
    useCallback(() => {
      const fetchCarros = async () => {
        try {
          const resultado = await DATABASE_API.get(
            "/api/collections/cars/records",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setCarros(resultado.data.items);
          setCarrosFiltrados(resultado.data.items); // Inicializa com todos os carros
        } catch (error) {
          console.log(`Erro ao buscar carros: ${error}`);
        }
      };

      if (token) {
        fetchCarros();
      }
    }, [token])
  );

  // Atualiza a lista filtrada ao alterar o texto da busca
  useFocusEffect(
    useCallback(() => {
      const resultadosFiltrados = carros.filter((carro) =>
        carro.brand.toLowerCase().includes(nomeMarca.toLowerCase())
      );
      setCarrosFiltrados(resultadosFiltrados);
    }, [nomeMarca, carros])
  );

  return (
    <View>
      <View>
        <TextInput
          placeholder="Buscar Por Marca"
          value={nomeMarca}
          onChangeText={(text) => setNomeMarca(text)}
        />
      </View>
      <View>
        <Button
          title="Criar Novo Carro"
          onPress={() => router.push("/telaFormulario")}
        />
      </View>
      <FlatList
        data={carrosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View>
              <Car brand={item.brand} name={item.name} hp={item.hp} />
            </View>
            <View>
              <Button title="Deletar" onPress={() => deletarCarro(item.id)} />
              <Button
                title="Editar"
                onPress={() => router.push(`/editar?id=${item.id}`)}
              />
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </View>
  )
}

export default HomeList;
