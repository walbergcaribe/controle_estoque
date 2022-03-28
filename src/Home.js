import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { formatCurrency } from "react-native-format-currency";

const Home = () => {

    const [products, setProducts] = useState([]);

    const route = useRoute();

    useEffect(() => {
        axios.get('http://10.0.2.2:3000/products')
            .then((res) => {
                setProducts(res.data);
            }).catch((error) => {
                alert('Erro ao consultar: ' + error);
            })
    }, [route.params?.res]);

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{paddingBottom: 10, maxHeight: '100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Cadastro de Produtos</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={{ fontSize: 15, color: 'blue', marginTop: 10, fontWeight: 'bold' }}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <FlatList style={{ padding: 0 }} 
                keyExtractor={(item, index) => item.id.toString()}
                data={products} 
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Editar', { product: item })}
                        style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 5 }}>
                        <Image source={{ uri: item.img ? item.img : null }}
                            style={{ width: 100, height: 100 }}
                            resizeMode='contain' />

                        <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                            <Text>Produto: {item.titulo}</Text>
                            <Text>Modelo: {item.modelo}</Text>
                            <Text>Categoria: {item.categoria}</Text>
                            <Text>Preço: {formatCurrency({ amount: item.preco, code: "BRL" })[0]}</Text>
                            <Text>Quantidade: {item.quantidade}</Text>
                        </View>
                    </TouchableOpacity>
                )} />

        </SafeAreaView >
    )
}

export default Home;
