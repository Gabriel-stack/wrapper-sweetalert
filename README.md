# 🎯 SweetAlert Wrapper


Wrapper **simples e direto** para SweetAlert2


[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)

---

## 📑 Índice

1. [Instalação](#-instalação)
2. [Uso Rápido](#-uso-rápido)
3. [API Completa](#-api-completa)
4. [Configuração](#️-configuração)
5. [Exemplos Práticos](#-exemplos-práticos)

## Instalação

### Opção 1: Versão Standalone (Recomendada)

**Arquivo único com SweetAlert2 já incluído!**

```html
<!-- Apenas 2 arquivos -->
<link rel="stylesheet" href="dist/sweetalert-wrapper.standalone.css">
<script src="dist/sweetalert-wrapper.standalone.iife.js"></script>

<script>
  // Pronto para usar!
  sweetAlert.success('Funcionou!', 'Wrapper carregado com sucesso');
</script>
```

### Opção 2: Versão Normal

```bash
# Instalar SweetAlert2 separadamente
npm install sweetalert2
```

```html
<link rel="stylesheet" href="dist/sweetalert-wrapper.css">
<script src="dist/sweetalert-wrapper.iife.js"></script>
```

---

## Uso Rápido

```javascript
// Notificações básicas
sweetAlert.success('Sucesso!', 'Operação realizada com sucesso');
sweetAlert.error('Erro!', 'Algo deu errado');
sweetAlert.warning('Atenção!', 'Esta ação requer cuidado');
sweetAlert.info('Informação', 'Aqui está uma dica útil');

// Confirmação
sweetAlert.confirm('Tem certeza?', 'Não poderá desfazer esta ação')
  .then(result => {
    if (result.isConfirmed) {
      console.log('Confirmado!');
    }
  });

// Toasts (notificações rápidas no canto)
sweetAlert.toastSuccess('Salvo com sucesso!');
sweetAlert.toastError('Erro ao processar!');
```

---

## API Completa

### Notificações

#### `success(title, text?, options?)`
Exibe alerta de sucesso

```javascript
sweetAlert.success('Sucesso!', 'Operação realizada com sucesso');

// Com opções personalizadas
sweetAlert.success('Cadastro Realizado', 'Bem-vindo!', {
  timer: 3000,
  timerProgressBar: true
});
```

#### `error(title, text?, options?)`
Exibe alerta de erro

```javascript
sweetAlert.error('Erro!', 'Algo deu errado');
```

#### `warning(title, text?, options?)`
Exibe alerta de aviso

```javascript
sweetAlert.warning('Atenção!', 'Esta ação requer cuidado');
```

#### `info(title, text?, options?)`
Exibe alerta informativo

```javascript
sweetAlert.info('Informação', 'Aqui está uma dica útil');
```

#### `confirm(title, text?, options?)`
Exibe diálogo de confirmação (retorna Promise)

```javascript
sweetAlert.confirm('Tem certeza?', 'Não poderá desfazer esta ação')
  .then(result => {
    if (result.isConfirmed) {
      console.log('Confirmado!');
    }
  });
```

---

### Toasts

Notificações rápidas que aparecem no canto da tela e desaparecem automaticamente.

#### `toastSuccess(message, options?)`
```javascript
sweetAlert.toastSuccess('Salvo com sucesso!');
```

#### `toastError(message, options?)`
```javascript
sweetAlert.toastError('Erro ao processar!');
```

#### `toastWarning(message, options?)`
```javascript
sweetAlert.toastWarning('Atenção necessária!');
```

#### `toastInfo(message, options?)`
```javascript
sweetAlert.toastInfo('Informação rápida!');
```

**Posições disponíveis:** `top`, `top-start`, `top-end`, `center`, `center-start`, `center-end`, `bottom`, `bottom-start`, `bottom-end`

---

### Erros

#### `errors(title, errorsArray, options?)`
Exibe múltiplos erros em formato de lista

```javascript
sweetAlert.errors('Erros Encontrados', [
  'O nome é obrigatório',
  'O email deve ser válido',
  'A senha deve ter no mínimo 8 caracteres'
]);
```

#### `validationErrors(errorsObject, options?)`
Exibe erros de validação no estilo Laravel/API

```javascript
const errors = {
  email: ['Email é obrigatório', 'Formato de email inválido'],
  password: ['Senha é obrigatória', 'Mínimo 8 caracteres']
};

sweetAlert.validationErrors(errors);
```

---

### Extras

#### `input(title, inputType?, options?)`
Solicita entrada de dados do usuário

```javascript
sweetAlert.input('Digite seu nome', 'text', {
  inputPlaceholder: 'Seu nome completo',
  inputValidator: (value) => {
    if (!value) return 'Você precisa digitar algo!';
  }
}).then(result => {
  if (result.value) {
    console.log('Nome:', result.value);
  }
});
```

**Tipos disponíveis:** `text`, `email`, `password`, `number`, `tel`, `url`, `textarea`, `select`, `radio`, `checkbox`, `file`, `range`

#### `loading(title?, options?)`
Exibe indicador de carregamento

```javascript
sweetAlert.loading('Processando dados...');

setTimeout(() => {
  sweetAlert.close();
  sweetAlert.toastSuccess('Concluído!');
}, 2000);
```

#### `close()`
Fecha o alerta atual

```javascript
sweetAlert.close();
```

#### `custom(options)`
Alerta totalmente personalizado

```javascript
sweetAlert.custom({
  title: 'Alerta Personalizado',
  html: '<b>Texto em negrito</b><br><i>Texto em itálico</i>',
  imageUrl: 'https://placehold.co/300/100',
  imageWidth: 200,
  confirmButtonText: 'Entendi!',
  confirmButtonColor: '#8b5cf6'
});
```

---

## Configuração

### Configuração Global

Aplica configurações em todos os alertas:

```javascript
sweetAlert.config({
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true
});
```

### Tema

```javascript
// Tema escuro
sweetAlert.setTheme('dark');

// Tema claro
sweetAlert.setTheme('light');
```

### Merge de Props

Sobrescreve configurações em alertas específicos:

```javascript
sweetAlert.success('Título', 'Mensagem', {
  timer: 5000,
  width: 600,
  background: '#f0f9ff'
});
```

### Acesso ao SweetAlert2 Original

```javascript
sweetAlert.swal.fire({
  // Todas as opções do SweetAlert2 nativo
});
```

---

## Exemplos Práticos

### Exemplo 1: Cadastro com Validação

```javascript
async function cadastrarUsuario(dados) {
  try {
    sweetAlert.loading('Cadastrando usuário...');
    
    const response = await fetch('/api/usuarios', {
      method: 'POST',
      body: JSON.stringify(dados)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      sweetAlert.close();
      sweetAlert.success('Cadastro Realizado!', 'Usuário criado com sucesso');
    } else {
      sweetAlert.validationErrors(result.errors);
    }
  } catch (error) {
    sweetAlert.error('Erro!', 'Não foi possível cadastrar o usuário');
  }
}
```

### Exemplo 2: Deletar com Confirmação

```javascript
function deletarItem(id) {
  sweetAlert.confirm(
    'Tem certeza?',
    'Esta ação não poderá ser desfeita!',
    {
      confirmButtonText: 'Sim, deletar!',
      confirmButtonColor: '#d33'
    }
  ).then(result => {
    if (result.isConfirmed) {
      sweetAlert.loading('Deletando...');
      
      fetch(`/api/items/${id}`, { method: 'DELETE' })
        .then(() => {
          sweetAlert.close();
          sweetAlert.toastSuccess('Item deletado!');
        })
        .catch(() => {
          sweetAlert.error('Erro', 'Não foi possível deletar');
        });
    }
  });
}
```

## Desenvolvimento

### Scripts

**Desenvolvimento:**
```bash
npm run dev
```
**Build para produção:**
```bash
npm run build
```

**Build apenas versão normal:**
```bash
npm run build:normal
```
**Build apenas versão standalone:**
```bash
npm run build:standalone
```

##  Documentação do SweetAlert2

Para opções avançadas: **https://sweetalert2.github.io/**

---

## 📝 Licença

MIT © Gabriel-stack

---

## Créditos

Construído sobre [SweetAlert2](https://sweetalert2.github.io/) por [Limon Monte](https://limonte.github.io/).
