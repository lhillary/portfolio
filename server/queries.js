const {pool} = require('./config');

const getContacts = (request, response) => {
    pool.query('SELECT * FROM contacts', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getContactById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM contacts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const createContact = (request, response) => {
    const Name = request.body.name,
            Email = request.body.email,
            Phone = request.body.phone,
            Message = request.body.message;

    pool.query(
        'INSERT INTO contacts (Name, Email, Phone, Message) VALUES ($1, $2, $3, $4)',
        [Name, Email, Phone, Message],
        (error) => {
            if (error) {
                throw error;
            }
            response.status(201).json({status: 'success', message: `Contact added!`});
        }
    )
}

const updateContact = (request, response) => {
    const id = parseInt(request.params.id);
    const Name = request.body.name,
            Email = request.body.email,
            Phone = request.body.phone,
            Message = request.body.message;

    pool.query(
        'UPDATE contacts SET name = $1, email = $2, phone = $3, contacted = $4 WHERE id = $5',
        [Name, Email, Phone, Contacted, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Contact modified with ID: ${id}`);
        }
    )
}

const deleteContact = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM contacts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Contact deleted with ID: ${id}`);
    });
}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
}