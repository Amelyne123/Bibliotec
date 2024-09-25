class Livro {
   constructor(titulo, autor, ano, genero) {
       this.titulo = titulo;
       this.autor = autor;
       this.ano = ano;
       this.genero = genero;
   }

   exibirInformacoes() {
       return `Título: ${this.titulo}, Autor: ${this.autor}, Ano: ${this.ano}, Gênero: ${this.genero}`;
   }
}

class Biblioteca {
   constructor() {
       this.livros = [];
   }

   adicionarLivro(livro) {
       this.livros.push(livro);
   }

   exibirLivros() {
       return this.livros.map(livro => livro.exibirInformacoes()).join('\n');
   }

   removerLivro(titulo) {
       this.livros = this.livros.filter(livro => livro.titulo !== titulo);
   }
}

document.addEventListener('DOMContentLoaded', () => {
   const biblioteca = new Biblioteca();

   const formulario = document.getElementById('formulario');
   const listaLivros = document.getElementById('listaLivros');

   formulario.addEventListener('submit', (e) => {
       e.preventDefault();

       const titulo = document.getElementById('titulo').value;
       const autor = document.getElementById('autor').value;
       const ano = document.getElementById('ano').value;
       const genero = document.getElementById('genero').value;

       if (titulo && autor && ano && genero) {
           const livro = new Livro(titulo, autor, ano, genero);
           biblioteca.adicionarLivro(livro);

           atualizarLista();
           formulario.reset();
       } else {
           alert('Por favor, preencha todos os campos.');
       }
   });

   function atualizarLista() {
       listaLivros.innerHTML = '';
       biblioteca.livros.forEach(livro => {
           const li = document.createElement('li');
           li.textContent = livro.exibirInformacoes();

           const botaoRemover = document.createElement('button');
           botaoRemover.textContent = 'Remover';
           botaoRemover.classList.add('remover');
           botaoRemover.addEventListener('click', () => {
               biblioteca.removerLivro(livro.titulo);
               atualizarLista();
           });

           li.appendChild(botaoRemover);
           listaLivros.appendChild(li);
       });
   }
});
