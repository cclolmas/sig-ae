#!/usr/bin/env python3
"""
Script para popular o banco de dados com dados de exemplo
baseados na tabela sintética do README.md
"""

import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from datetime import date, datetime
from src.main import app
from src.models.alimentacao import (
    db, UnidadeEscolar, Fornecedor, Categoria, Produto, 
    Estoque, Consumo, AvaliacaoFAD
)

def populate_database():
    with app.app_context():
        # Limpar dados existentes
        db.drop_all()
        db.create_all()
        
        print("Criando categorias...")
        categorias = [
            Categoria(nome="Grão", descricao="Cereais e grãos"),
            Categoria(nome="Leguminosa", descricao="Feijões e leguminosas"),
            Categoria(nome="Óleo", descricao="Óleos e gorduras"),
            Categoria(nome="Hortaliça", descricao="Verduras e legumes"),
            Categoria(nome="Tubérculo", descricao="Batatas e tubérculos"),
            Categoria(nome="Proteína", descricao="Carnes e proteínas animais"),
            Categoria(nome="Cereal", descricao="Cereais processados"),
            Categoria(nome="Laticínio", descricao="Leite e derivados"),
            Categoria(nome="Massa", descricao="Massas e macarrões"),
            Categoria(nome="Adoçante", descricao="Açúcares e adoçantes"),
            Categoria(nome="Fruta", descricao="Frutas frescas"),
            Categoria(nome="Proteína Vegetal", descricao="Proteínas de origem vegetal")
        ]
        
        for categoria in categorias:
            db.session.add(categoria)
        db.session.commit()
        
        print("Criando fornecedores...")
        fornecedores = [
            Fornecedor(nome="Distribuidora A", cnpj="12.345.678/0001-90", endereco="Rua A, 123", telefone="(61) 1234-5678"),
            Fornecedor(nome="BSB Alimentos", cnpj="23.456.789/0001-01", endereco="Rua B, 456", telefone="(61) 2345-6789"),
            Fornecedor(nome="Comigo", cnpj="34.567.890/0001-12", endereco="Rua C, 789", telefone="(61) 3456-7890"),
            Fornecedor(nome="Fazenda Feliz", cnpj="45.678.901/0001-23", endereco="Fazenda Rural", telefone="(61) 4567-8901"),
            Fornecedor(nome="Sítio Raiz Forte", cnpj="56.789.012/0001-34", endereco="Sítio Rural", telefone="(61) 5678-9012"),
            Fornecedor(nome="NutriPrático", cnpj="67.890.123/0001-45", endereco="Rua D, 321", telefone="(61) 6789-0123"),
            Fornecedor(nome="Pescados do Mar", cnpj="78.901.234/0001-56", endereco="Rua E, 654", telefone="(61) 7890-1234"),
            Fornecedor(nome="Unium", cnpj="89.012.345/0001-67", endereco="Rua F, 987", telefone="(61) 8901-2345"),
            Fornecedor(nome="LactaVida", cnpj="90.123.456/0001-78", endereco="Rua G, 147", telefone="(61) 9012-3456"),
            Fornecedor(nome="Pastifício Bom Gosto", cnpj="01.234.567/0001-89", endereco="Rua H, 258", telefone="(61) 0123-4567"),
            Fornecedor(nome="Safira", cnpj="12.345.678/0002-01", endereco="Rua I, 369", telefone="(61) 1234-5679"),
            Fornecedor(nome="Bananal Tropical", cnpj="23.456.789/0002-12", endereco="Fazenda Tropical", telefone="(61) 2345-6780"),
            Fornecedor(nome="Frigorífico Central", cnpj="34.567.890/0002-23", endereco="Rua J, 741", telefone="(61) 3456-7891"),
            Fornecedor(nome="Suíno Nobre", cnpj="45.678.901/0002-34", endereco="Rua K, 852", telefone="(61) 4567-8902"),
            Fornecedor(nome="Granja Ouro", cnpj="56.789.012/0002-45", endereco="Granja Rural", telefone="(61) 5678-9013"),
            Fornecedor(nome="Laticínios da Serra", cnpj="67.890.123/0002-56", endereco="Serra Rural", telefone="(61) 6789-0124"),
            Fornecedor(nome="SojaVida", cnpj="78.901.234/0002-67", endereco="Rua L, 963", telefone="(61) 7890-1235")
        ]
        
        for fornecedor in fornecedores:
            db.session.add(fornecedor)
        db.session.commit()
        
        print("Criando unidades escolares...")
        unidades = [
            UnidadeEscolar(id="UE-01", nome="Centro de Ensino Fundamental 01", endereco="Quadra 1, Conjunto A", telefone="(61) 3901-1001", modalidades="Integral"),
            UnidadeEscolar(id="UE-02", nome="Escola Classe 02", endereco="Quadra 2, Conjunto B", telefone="(61) 3901-1002", modalidades="Parcial"),
            UnidadeEscolar(id="UE-03", nome="Centro de Educação Infantil 03", endereco="Quadra 3, Conjunto C", telefone="(61) 3901-1003", modalidades="Creche"),
            UnidadeEscolar(id="UE-04", nome="Centro de Ensino Médio 04", endereco="Quadra 4, Conjunto D", telefone="(61) 3901-1004", modalidades="EJA"),
            UnidadeEscolar(id="UE-05", nome="Escola Integral Vegana 05", endereco="Quadra 5, Conjunto E", telefone="(61) 3901-1005", modalidades="Integral (Veg)")
        ]
        
        for unidade in unidades:
            db.session.add(unidade)
        db.session.commit()
        
        print("Criando produtos...")
        # Buscar IDs das categorias e fornecedores
        cat_grao = Categoria.query.filter_by(nome="Grão").first()
        cat_leguminosa = Categoria.query.filter_by(nome="Leguminosa").first()
        cat_oleo = Categoria.query.filter_by(nome="Óleo").first()
        cat_hortalica = Categoria.query.filter_by(nome="Hortaliça").first()
        cat_tuberculo = Categoria.query.filter_by(nome="Tubérculo").first()
        cat_proteina = Categoria.query.filter_by(nome="Proteína").first()
        cat_cereal = Categoria.query.filter_by(nome="Cereal").first()
        cat_laticinio = Categoria.query.filter_by(nome="Laticínio").first()
        cat_massa = Categoria.query.filter_by(nome="Massa").first()
        cat_adocante = Categoria.query.filter_by(nome="Adoçante").first()
        cat_fruta = Categoria.query.filter_by(nome="Fruta").first()
        cat_proteina_vegetal = Categoria.query.filter_by(nome="Proteína Vegetal").first()
        
        produtos = [
            Produto(nome="Arroz Parboilizado", categoria_id=cat_grao.id, fornecedor_id=1, unidade_medida="Kg", marca="Distribuidora A", is_vegano=True, is_sem_gluten=True),
            Produto(nome="Feijão Preto", categoria_id=cat_leguminosa.id, fornecedor_id=2, unidade_medida="Kg", marca="BSB", is_vegano=True, is_sem_gluten=True),
            Produto(nome="Óleo de Soja", categoria_id=cat_oleo.id, fornecedor_id=3, unidade_medida="Litro", marca="Comigo", is_vegano=True, is_sem_gluten=True),
            Produto(nome="Abóbora Cabotian", categoria_id=cat_hortalica.id, fornecedor_id=4, unidade_medida="Kg", marca="Fazenda Feliz", is_vegano=True, is_sem_gluten=True),
            Produto(nome="Batata Doce", categoria_id=cat_tuberculo.id, fornecedor_id=5, unidade_medida="Kg", marca="Sítio Raiz Forte", is_vegano=True, is_sem_gluten=True),
            Produto(nome="Cenoura", categoria_id=cat_hortalica.id, fornecedor_id=4, unidade_medida="Kg", marca="Fazenda Feliz", is_vegano=True, is_sem_gluten=True),
            Produto(nome="Peito de Frango Pouch", categoria_id=cat_proteina.id, fornecedor_id=6, unidade_medida="Kg", marca="NutriPrático", is_vegano=False, is_sem_gluten=True),
            Produto(nome="Atum Pouch", categoria_id=cat_proteina.id, fornecedor_id=7, unidade_medida="Kg", marca="Pescados do Mar", is_vegano=False, is_sem_gluten=True),
            Produto(nome="Farinha de Milho Flocada", categoria_id=cat_cereal.id, fornecedor_id=8, unidade_medida="Kg", marca="Unium", is_vegano=True, is_sem_gluten=True),
            Produto(nome="Leite em Pó", categoria_id=cat_laticinio.id, fornecedor_id=9, unidade_medida="Kg", marca="LactaVida", is_vegano=False, is_sem_gluten=True),
            Produto(nome="Macarrão Parafuso", categoria_id=cat_massa.id, fornecedor_id=10, unidade_medida="Kg", marca="Pastifício Bom Gosto", is_vegano=True, is_sem_gluten=False),
            Produto(nome="Açúcar Cristal", categoria_id=cat_adocante.id, fornecedor_id=11, unidade_medida="Kg", marca="Safira", is_vegano=True, is_sem_gluten=True),
            Produto(nome="Banana Prata", categoria_id=cat_fruta.id, fornecedor_id=12, unidade_medida="Kg", marca="Bananal Tropical", is_vegano=True, is_sem_gluten=True),
            Produto(nome="Carne Bovina Moída", categoria_id=cat_proteina.id, fornecedor_id=13, unidade_medida="Kg", marca="Frigorífico Central", is_vegano=False, is_sem_gluten=True),
            Produto(nome="Lombo Suíno", categoria_id=cat_proteina.id, fornecedor_id=14, unidade_medida="Kg", marca="Suíno Nobre", is_vegano=False, is_sem_gluten=True),
            Produto(nome="Ovo de Galinha", categoria_id=cat_proteina.id, fornecedor_id=15, unidade_medida="Dúzia", marca="Granja Ouro", is_vegano=False, is_sem_gluten=True),
            Produto(nome="Queijo Muçarela", categoria_id=cat_laticinio.id, fornecedor_id=16, unidade_medida="Kg", marca="Laticínios da Serra", is_vegano=False, is_sem_gluten=True),
            Produto(nome="Tofu Firme", categoria_id=cat_proteina_vegetal.id, fornecedor_id=17, unidade_medida="Kg", marca="SojaVida", is_vegano=True, is_sem_gluten=True)
        ]
        
        for produto in produtos:
            db.session.add(produto)
        db.session.commit()
        
        print("Criando registros de estoque...")
        # Dados baseados na tabela sintética do README.md
        estoques_data = [
            (1, "UE-01", "AP2025-01", date(2026, 3, 15), date(2025, 2, 10), 200.0, 5.50, 1100.00, 195.0),
            (2, "UE-01", "FPBSB-L2", date(2027, 3, 5), date(2025, 2, 10), 150.0, 8.20, 1230.00, 145.5),
            (3, "UE-02", "OSCOM-125", date(2025, 8, 6), date(2025, 3, 31), 50.0, 9.80, 490.00, 49.1),
            (4, "UE-01", "AC2025-A", date(2025, 2, 25), date(2025, 2, 17), 30.0, 3.50, 105.00, 22.5),
            (5, "UE-03", "BD2025-03", date(2025, 3, 10), date(2025, 2, 24), 40.0, 4.10, 164.00, 36.2),
            (6, "UE-02", "CN2025-B", date(2025, 3, 5), date(2025, 2, 17), 50.0, 3.90, 195.00, 45.0),
            (7, "UE-01", "PFP-007", date(2026, 1, 28), date(2025, 2, 10), 20.0, 25.00, 500.00, 11.2),
            (8, "UE-04", "ATP-112", date(2026, 8, 7), date(2025, 2, 10), 10.0, 35.00, 350.00, 6.0),
            (9, "UE-02", "FMU-0224", date(2025, 6, 16), date(2025, 3, 31), 125.0, 6.50, 812.50, 119.0),
            (10, "UE-03", "LP2025-59", date(2025, 10, 22), date(2025, 2, 10), 60.0, 30.00, 1800.00, 57.0),
            (11, "UE-01", "MP-1809", date(2026, 2, 3), date(2025, 2, 10), 35.0, 7.00, 245.00, 29.0),
            (12, "UE-02", "ACS-132", date(2026, 6, 1), date(2025, 3, 31), 80.0, 4.80, 384.00, 78.3),
            (13, "UE-03", "BP2025-W7", date(2025, 2, 20), date(2025, 2, 17), 90.0, 5.20, 468.00, 75.0),
            (14, "UE-01", "CBM-0402", date(2026, 2, 4), date(2025, 2, 10), 26.0, 32.00, 832.00, 22.0),
            (15, "UE-02", "LS-0903", date(2026, 3, 9), date(2025, 2, 10), 24.0, 28.00, 672.00, 18.0),
            (16, "UE-03", "OV-1202", date(2025, 3, 15), date(2025, 2, 24), 30.0, 10.00, 300.00, 27.35),
            (17, "UE-01", "QM-1907", date(2025, 7, 19), date(2025, 2, 10), 20.0, 45.00, 900.00, 19.0),
            (18, "UE-05", "TF-0103", date(2025, 4, 10), date(2025, 3, 3), 15.0, 22.00, 330.00, 12.5)
        ]
        
        for produto_id, unidade_id, lote, data_val, data_rec, qtd_rec, custo_unit, custo_total, saldo in estoques_data:
            estoque = Estoque(
                produto_id=produto_id,
                unidade_escolar_id=unidade_id,
                lote=lote,
                data_validade=data_val,
                data_recebimento=data_rec,
                quantidade_recebida=qtd_rec,
                custo_unitario=custo_unit,
                custo_total=custo_total,
                saldo_atual=saldo
            )
            db.session.add(estoque)
        
        db.session.commit()
        
        print("Criando registros de consumo...")
        # Alguns registros de consumo de exemplo
        consumos_data = [
            (1, "UE-01", date(2025, 2, 11), 5.0, "Integral", "Almoço", 150),
            (2, "UE-01", date(2025, 2, 11), 4.5, "Integral", "Almoço", 150),
            (3, "UE-02", date(2025, 4, 1), 0.9, "Parcial", "Almoço", 80),
            (4, "UE-01", date(2025, 2, 18), 7.5, "Integral", "Almoço", 150),
            (5, "UE-03", date(2025, 2, 25), 3.8, "Creche", "Lanche", 60),
            (6, "UE-02", date(2025, 2, 18), 5.0, "Integral", "Almoço", 80),
            (7, "UE-01", date(2025, 2, 20), 8.8, "Integral", "Almoço", 150),
            (8, "UE-04", date(2025, 3, 24), 4.0, "EJA", "Jantar", 40),
            (9, "UE-02", date(2025, 4, 2), 6.0, "Parcial", "Lanche", 80),
            (10, "UE-03", date(2025, 2, 12), 3.0, "Creche", "Café da Manhã", 60)
        ]
        
        for produto_id, unidade_id, data_cons, qtd_cons, modalidade, tipo_ref, alunos in consumos_data:
            consumo = Consumo(
                produto_id=produto_id,
                unidade_escolar_id=unidade_id,
                data_consumo=data_cons,
                quantidade_consumida=qtd_cons,
                modalidade_ensino=modalidade,
                tipo_refeicao=tipo_ref,
                alunos_atendidos=alunos
            )
            db.session.add(consumo)
        
        db.session.commit()
        
        print("Criando avaliações FAD...")
        avaliacoes_data = [
            ("UE-01", "1ª Distribuição", date(2025, 2, 15), 4, 5, 4, "Boa qualidade geral dos produtos"),
            ("UE-02", "1ª Distribuição", date(2025, 2, 15), 3, 3, 3, "Alguns atrasos na entrega"),
            ("UE-03", "1ª Distribuição", date(2025, 2, 15), 5, 5, 5, "Excelente qualidade e pontualidade"),
            ("UE-04", "1ª Distribuição", date(2025, 2, 15), 4, 4, 4, "Produtos adequados para EJA"),
            ("UE-05", "1ª Distribuição", date(2025, 2, 15), 5, 5, 5, "Produtos veganos de ótima qualidade")
        ]
        
        for unidade_id, periodo, data_aval, qual, prazo, prep, coment in avaliacoes_data:
            avaliacao = AvaliacaoFAD(
                unidade_escolar_id=unidade_id,
                periodo_distribuicao=periodo,
                data_avaliacao=data_aval,
                avaliacao_qualidade=qual,
                avaliacao_prazo=prazo,
                avaliacao_novas_preparacoes=prep,
                comentarios=coment
            )
            db.session.add(avaliacao)
        
        db.session.commit()
        
        print("Banco de dados populado com sucesso!")
        print(f"- {len(categorias)} categorias")
        print(f"- {len(fornecedores)} fornecedores")
        print(f"- {len(unidades)} unidades escolares")
        print(f"- {len(produtos)} produtos")
        print(f"- {len(estoques_data)} registros de estoque")
        print(f"- {len(consumos_data)} registros de consumo")
        print(f"- {len(avaliacoes_data)} avaliações FAD")

if __name__ == '__main__':
    populate_database()

