//Aluno: Thiago Silva Soares
//Matrícula: 2011250

import React, { Component } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notas: ['', '', ''],
      mediaDesejada: 60,
      resultado: '',
    };
  }

  calcularMedia(notas) {
    const notasValidas = notas.filter(nota => !isNaN(nota) && nota !== '');
    if (notasValidas.length === 0) return 0;
    const somaNotas = notasValidas.reduce((acc, nota) => acc + parseFloat(nota), 0);
    return somaNotas / notasValidas.length;
  }

  handleNotaChange = (index, nota) => {
    const newNotas = [...this.state.notas];
    // Substituir vírgula por ponto e verificar se é um número
    nota = nota.replace(',', '.');
    if (!isNaN(nota)) {
      newNotas[index] = nota;
      this.setState({ notas: newNotas });
    }
  };

  handleCalcular = () => {
    const { notas } = this.state;

    if (notas[0] === '100' && notas[1] === '100') {
      this.setState({
        resultado: 'Parabéns, você já passou! Sua média já é igual ou maior que 60.',
      });
    } else if (notas[0] !== '' && notas[1] !== '') {
      if (notas[2] === '') {
        const mediaDesejada = this.state.mediaDesejada;
        const notasPreenchidas = notas.filter(nota => nota !== '');
        const somaNotas = notasPreenchidas.reduce((acc, nota) => acc + parseFloat(nota), 0);

        if (mediaDesejada * 3 - somaNotas <= 0) {
          this.setState({
            resultado: 'Parabéns, você já passou! Sua média já é igual ou maior que 60.',
          });
        } else {
          const pontuacaoNecessaria = (mediaDesejada * 3) - somaNotas;
          this.setState({
            resultado: `Para atingir a média de ${mediaDesejada}, você precisa de ${pontuacaoNecessaria.toFixed(2)} na terceira avaliação.`,
          });
        }
      } else {
        const mediaFinal = this.calcularMedia(notas);
        this.setState({ resultado: `Sua média final é: ${mediaFinal.toFixed(2)}` });
      }
    } else {
      this.setState({
        resultado: 'Insira pelo menos duas notas para calcular a média ou a pontuação necessária.',
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Calculadora de Notas</Text>
        {this.state.notas.map((nota, index) => (
          <TextInput
            key={index}
            placeholder={`Nota ${index + 1}`}
            keyboardType="numeric"
            style={styles.input}
            value={this.state.notas[index]}
            onChangeText={(nota) => this.handleNotaChange(index, nota)}
          />
        ))}
        <Button title="Calcular" onPress={this.handleCalcular} color="purple" />
        {this.state.resultado !== '' && (
          <Text style={styles.resultado}>{this.state.resultado}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultado: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default App;