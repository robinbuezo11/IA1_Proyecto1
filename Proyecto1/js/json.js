const nodemailer = require('nodemailer');
const path = require('path');

// Leer y procesar los archivos JSON para obtener estadísticas y generar reportes según el tipo
const leerArchivosJSON = (directorio, callback) => {
    fs.readdir(directorio, (err, files) => {
        if (err) {
            console.error('Error al leer el directorio:', err);
            callback([]);
            return;
        }

        const jsonFiles = files.filter(file => path.extname(file) === '.json');
        const reportes = [];

        jsonFiles.forEach(file => {
            const filePath = path.join(directorio, file);
            const contenido = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(contenido);

            let reporte = { nombreArchivo: file };

            // Si el archivo contiene "reporteA", generar ventas totales y productos más vendidos
            if (file.includes('reporteA')) {
                // Total de ventas
                const totalVentas = jsonData.reduce((sum, venta) => sum + venta.totalVenta, 0);
                const totalTransacciones = jsonData.length;
                const totalProductosVendidos = jsonData.reduce((sum, venta) => sum + venta.cantidad, 0);
                const promedioVenta = totalVentas / totalTransacciones;

                // Productos más vendidos
                const productosVendidos = jsonData.reduce((productos, venta) => {
                    productos[venta.producto] = (productos[venta.producto] || 0) + venta.cantidad;
                    return productos;
                }, {});

                let productoMasVendido = Object.keys(productosVendidos).reduce((a, b) => productosVendidos[a] > productosVendidos[b] ? a : b);

                // Agregar al reporte
                reporte.ventasTotales = {
                    totalVentas: totalVentas,
                    totalTransacciones: totalTransacciones,
                    totalProductosVendidos: totalProductosVendidos,
                    promedioVenta: promedioVenta,
                };
                reporte.productoMasVendido = {
                    producto: productoMasVendido,
                    cantidad: productosVendidos[productoMasVendido]
                };
            }

            // Si el archivo contiene "reporteB", generar cliente que más gastó y ventas por producto
            if (file.includes('reporteB')) {
                // Cliente que más gastó
                const clientes = jsonData.reduce((gastos, venta) => {
                    gastos[venta.cliente] = (gastos[venta.cliente] || 0) + venta.totalVenta;
                    return gastos;
                }, {});

                let clienteQueMasGasto = Object.keys(clientes).reduce((a, b) => clientes[a] > clientes[b] ? a : b);

                // Ventas por producto
                const ventasPorProducto = jsonData.reduce((totales, venta) => {
                    totales[venta.producto] = (totales[venta.producto] || 0) + venta.totalVenta;
                    return totales;
                }, {});

                // Agregar al reporte
                reporte.clienteQueMasGasto = {
                    cliente: clienteQueMasGasto,
                    totalGastado: clientes[clienteQueMasGasto]
                };
                reporte.ventasPorProducto = ventasPorProducto;
            }

            reportes.push(reporte);
        });

        callback(reportes);
    });
};

// Generar HTML del reporte basado en el tipo de archivo
const generarReporteHTML = (reportes) => {
    let html = '<h1>Reporte de archivos JSON</h1>';

    reportes.forEach(reporte => {
        html += `<h2>Archivo: ${reporte.nombreArchivo}</h2>`;
        if (reporte.ventasTotales && reporte.productoMasVendido) {
            // Reporte A: Ventas Totales y Producto Más Vendido
            html += `
            <h3>Reporte de Ventas Totales</h3>
            <ul>
                <li><strong>Total de Ventas:</strong> $${reporte.ventasTotales.totalVentas.toFixed(2)}</li>
                <li><strong>Total de Transacciones:</strong> ${reporte.ventasTotales.totalTransacciones}</li>
                <li><strong>Total de Productos Vendidos:</strong> ${reporte.ventasTotales.totalProductosVendidos}</li>
                <li><strong>Promedio de Venta por Transacción:</strong> $${reporte.ventasTotales.promedioVenta.toFixed(2)}</li>
            </ul>
            <h3>Producto Más Vendido</h3>
            <p><strong>Producto:</strong> ${reporte.productoMasVendido.producto} (${reporte.productoMasVendido.cantidad} unidades)</p>
            <hr>`;
        }
        if (reporte.clienteQueMasGasto && reporte.ventasPorProducto) {
            // Reporte B: Cliente que más gastó y Ventas por Producto
            html += `
            <h3>Cliente que Más Gastó</h3>
            <p><strong>Cliente:</strong> ${reporte.clienteQueMasGasto.cliente} ($${reporte.clienteQueMasGasto.totalGastado.toFixed(2)})</p>
            <h3>Ventas por Producto</h3>
            <ul>`;
            Object.keys(reporte.ventasPorProducto).forEach(producto => {
                html += `<li>${producto}: $${reporte.ventasPorProducto[producto].toFixed(2)}</li>`;
            });
            html += '</ul><hr>';
        }
    });

    return html;
};

// Enviar el correo con el reporte HTML
const enviarCorreo = (reportes, destinatario) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const htmlContent = generarReporteHTML(reportes);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: destinatario,
        subject: 'Reporte de archivos JSON',
        html: htmlContent  // Enviar como HTML
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

// Agregar la funcionalidad de reportar los JSONs en la conversación
const reportarJSONs = (directorio, destinatario) => {
    leerArchivosJSON(directorio, (reportes) => {
        if (reportes.length > 0) {
            enviarCorreo(reportes, destinatario);
        } else {
            console.log('No se encontraron archivos JSON en el directorio.');
        }
    });
};

module.exports = {
    reportarJSONs,
}