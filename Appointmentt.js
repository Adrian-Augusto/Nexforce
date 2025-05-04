frappe.ui.form.on('Appointmentt', {
    validate: function(frm) {
        if (frm.doc.seller && frm.doc.inicio && frm.doc.fim) {
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Appointmentt',
                    filters: [
                        ['seller', '=', frm.doc.seller],
                        ['nome', '!=', frm.doc.nome],
                        ['inicio', '<', frm.doc.fim],
                        ['fim', '>', frm.doc.inicio]
                    ],
                    fields: ['nome'],
                    limit_page_length: 1
                },
                async: false, // 
                callback: function(r) {
                    if (r.message && r.message.length > 0) {
                        frappe.msgprint(__('Erro: Este vendedor já possui outro compromisso neste horário.'));
                        frappe.validated = false; // 
                    }
                }
            });
        }
    }
});
