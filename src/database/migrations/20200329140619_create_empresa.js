exports.up = function(knex) {
    return knex.schema.createTable('empresas', function(table){
        table.string('id').primary();
        table.string('nome_dono').notNullable();
        table.string('nome_empresa').notNullable();
        table.string('email').notNullable();
        table.string('telefone').notNullable();
        table.string('cpf', 15).notNullable();
        table.string('cnpj', 19).notNullable();  
        table.string('rg').notNullable();
        table.string('orgao_emissor').notNullable();      
        table.string('cidade').notNullable();
        table.string('bairro').notNullable();
        table.string('cep').notNullable();
        table.string('numero').notNullable();
        table.string('rua').notNullable();
        table.string('complemento');
        table.string('estado');
        table.string('latitude').notNullable();
        table.string('longitude').notNullable();
        table.string('senha').notNullable();
        table.string('updateCode');
        table.string('updateCode_expires');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('empresas');
};
