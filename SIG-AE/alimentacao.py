from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class UnidadeEscolar(db.Model):
    __tablename__ = 'unidades_escolares'
    
    id = db.Column(db.String(20), primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    endereco = db.Column(db.String(300))
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    modalidades = db.Column(db.String(200))  # JSON string com modalidades atendidas
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    estoques = db.relationship('Estoque', backref='unidade_escolar', lazy=True)
    consumos = db.relationship('Consumo', backref='unidade_escolar', lazy=True)
    avaliacoes = db.relationship('AvaliacaoFAD', backref='unidade_escolar', lazy=True)

class Fornecedor(db.Model):
    __tablename__ = 'fornecedores'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    cnpj = db.Column(db.String(18))
    endereco = db.Column(db.String(300))
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    produtos = db.relationship('Produto', backref='fornecedor', lazy=True)

class Categoria(db.Model):
    __tablename__ = 'categorias'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    
    # Relacionamentos
    produtos = db.relationship('Produto', backref='categoria', lazy=True)

class Produto(db.Model):
    __tablename__ = 'produtos'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)
    fornecedor_id = db.Column(db.Integer, db.ForeignKey('fornecedores.id'), nullable=False)
    unidade_medida = db.Column(db.String(20), nullable=False)
    marca = db.Column(db.String(100))
    is_vegano = db.Column(db.Boolean, default=False)
    is_sem_gluten = db.Column(db.Boolean, default=False)
    is_sem_lactose = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    estoques = db.relationship('Estoque', backref='produto', lazy=True)
    consumos = db.relationship('Consumo', backref='produto', lazy=True)

class Estoque(db.Model):
    __tablename__ = 'estoques'
    
    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    unidade_escolar_id = db.Column(db.String(20), db.ForeignKey('unidades_escolares.id'), nullable=False)
    lote = db.Column(db.String(50))
    data_validade = db.Column(db.Date)
    data_recebimento = db.Column(db.Date, nullable=False)
    quantidade_recebida = db.Column(db.Float, nullable=False)
    custo_unitario = db.Column(db.Float)
    custo_total = db.Column(db.Float)
    saldo_atual = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Consumo(db.Model):
    __tablename__ = 'consumos'
    
    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    unidade_escolar_id = db.Column(db.String(20), db.ForeignKey('unidades_escolares.id'), nullable=False)
    data_consumo = db.Column(db.Date, nullable=False)
    quantidade_consumida = db.Column(db.Float, nullable=False)
    modalidade_ensino = db.Column(db.String(50))  # Integral, Parcial, Creche, EJA
    tipo_refeicao = db.Column(db.String(50))  # Almoço, Lanche, Jantar, Café da Manhã
    alunos_atendidos = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class AvaliacaoFAD(db.Model):
    __tablename__ = 'avaliacoes_fad'
    
    id = db.Column(db.Integer, primary_key=True)
    unidade_escolar_id = db.Column(db.String(20), db.ForeignKey('unidades_escolares.id'), nullable=False)
    periodo_distribuicao = db.Column(db.String(50), nullable=False)
    data_avaliacao = db.Column(db.Date, nullable=False)
    avaliacao_qualidade = db.Column(db.Integer)  # 1-5
    avaliacao_prazo = db.Column(db.Integer)  # 1-5
    avaliacao_novas_preparacoes = db.Column(db.Integer)  # 1-5
    comentarios = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Cardapio(db.Model):
    __tablename__ = 'cardapios'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    data_inicio = db.Column(db.Date, nullable=False)
    data_fim = db.Column(db.Date, nullable=False)
    modalidade_ensino = db.Column(db.String(50))
    tipo_refeicao = db.Column(db.String(50))
    descricao = db.Column(db.Text)
    valor_per_capita = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    itens = db.relationship('ItemCardapio', backref='cardapio', lazy=True)

class ItemCardapio(db.Model):
    __tablename__ = 'itens_cardapio'
    
    id = db.Column(db.Integer, primary_key=True)
    cardapio_id = db.Column(db.Integer, db.ForeignKey('cardapios.id'), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    quantidade_per_capita = db.Column(db.Float, nullable=False)
    observacoes = db.Column(db.Text)
    
    # Relacionamento
    produto = db.relationship('Produto', backref='itens_cardapio')

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)  # admin, gestor, nutricionista, cozinheiro
    unidade_escolar_id = db.Column(db.String(20), db.ForeignKey('unidades_escolares.id'))
    ativo = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamento
    unidade_escolar = db.relationship('UnidadeEscolar', backref='usuarios')

