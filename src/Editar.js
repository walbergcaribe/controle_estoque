import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Image, StyleSheet, Text,
    TextInput,
    TouchableOpacity, View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'react-native-image-picker';
import Constants from './util/Contants';


const Editar = () => {

    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [modelo, setModelo] = useState('');
    const [preco, setPreco] = useState();
    const [quantidade, setQuantidade] = useState();
    const [fornecedor, setFornecedor] = useState();
    const [img, setImg] = useState('');
    const [id, setId] = useState('');

    // Combo de Unidades
    const [openUnidades, setOpenUnidades] = useState(false);
    const [unidade, setUnidade] = useState(null);
    const [itensUnidades, setItensUnidades] = useState(Constants.unidades);

    const route = useRoute();

    //Style placeholder
    const placeholderTextColor = '#5a5a5a';

    useEffect(() => {
        const product = route.params?.product;

        if (product) {
            setId(product.id);
            setTitulo(product.titulo);
            setCategoria(product.categoria);
            setModelo(product.modelo);
            setPreco(product.preco ? product.preco.toString() : '');
            setQuantidade(product.quantidade ? product.quantidade.toString() : '');
            setUnidade(product.unidade);
            setFornecedor(product.fornecedor);
            setImg(product.img);
        } else {
            alert('Produto não encontrato!');
        }
    }, []);

    const navigation = useNavigation();

    const getImage = () => {
        ImagePicker.launchImageLibrary({ title: 'Seleciona uma imagem' },
            (data) => {
                if (data != null) {
                    if (!data.didCancel) {
                        console.log('########### data: ' + JSON.stringify(data));
                        setImg(data.assets[0].uri);
                    }
                }
            });
    }

    const saveProduct = () => {

        const precoFloat = parseFloat(preco);

        if (titulo.trim() && preco != null) {
            axios.patch('http://10.0.2.2:3000/products/' + id, {
                titulo,
                categoria,
                modelo,
                preco: precoFloat,
                quantidade,
                unidade,
                fornecedor,
                img
            }).then((res) => {
                alert('Atualizado com sucesso!');
                navigation.navigate('Home', { res })
            }).catch((error) => {
                alert('Erro ao atualizar: ' + error)
            })
        } else {
            alert('O Título e o Preço são obrigatórios!');
        }
    }

    const deleteProduct = () => {
        axios.delete('http://10.0.2.2:3000/products/' + id)
            .then((res) => {
                alert('Removido com sucesso!');
                navigation.navigate('Home', { res })
            }).catch((error) => {
                alert('Erro ao remover: ' + error)
            })
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: img ? img : null }} />

            <TouchableOpacity onPress={getImage}>
                <Text>Carregar Imagem</Text>
            </TouchableOpacity>

            <TextInput value={titulo} onChangeText={(value) => setTitulo(value)}
                placeholder='Título...'
                placeholderTextColor={placeholderTextColor} style={styles.input} />

            <TextInput value={categoria} onChangeText={(value) => setCategoria(value)}
                placeholder='Categoria...' placeholderTextColor={placeholderTextColor}
                style={styles.input} />

            <TextInput value={modelo} onChangeText={(value) => setModelo(value)}
                placeholder='Modelo...' placeholderTextColor={placeholderTextColor}
                style={styles.input} />

            <TextInput value={preco} onChangeText={(value) => setPreco(value)}
                placeholder='Preço...' placeholderTextColor={placeholderTextColor}
                keyboardType='numeric' style={styles.input} />

            <TextInput value={quantidade} onChangeText={(value) => setQuantidade(value)}
                placeholder='Quantidade...' placeholderTextColor={placeholderTextColor}
                keyboardType='numeric' style={styles.input} />

            <DropDownPicker
                placeholder='Unidade...'
                placeholderTextColor={placeholderTextColor}
                style={styles.input}
                open={openUnidades}
                value={unidade}
                items={itensUnidades}
                setOpen={setOpenUnidades}
                setValue={setUnidade}
                setItems={setItensUnidades}
                listMode="SCROLLVIEW" />

            <TextInput value={fornecedor} onChangeText={(value) => setFornecedor(value)}
                placeholder='Fornecedor...' placeholderTextColor={placeholderTextColor}
                style={styles.input} />

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>
                <Text onPress={saveProduct} style={styles.save}>Atualizar</Text>
                <Text onPress={deleteProduct} style={styles.remove}>Remover</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    input: {
        fontSize: 14,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        width: '100%',
        borderColor: 'gray',
        backgroundColor: 'white'
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 1
    },

    container: {
        padding: 20,
        alignItems: 'center'
    },

    save: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        marginRight: 20
    },

    remove: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20
    }
});

export default Editar;
