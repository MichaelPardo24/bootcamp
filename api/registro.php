<?php
// Configuración de CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Permite métodos GET, POST, PUT, DELETE, OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Permite encabezados específicos


// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "marketing_turistico");

if ($conn->connect_error) {
    die(json_encode(["mensaje" => "Conexión fallida: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Si es una solicitud OPTIONS (preflight), responde con 200 OK
    header('HTTP/1.1 200 OK');
    exit;
}

// Si la solicitud es de tipo GET, se consultan los usuarios
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener todos los usuarios
    $sql = "SELECT id, nombre, email FROM usuarios";
    $result = $conn->query($sql);

    $usuarios = [];
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }

    // Devolver los usuarios en formato JSON
    echo json_encode($usuarios);
} 

// Si la solicitud es de tipo POST, se inserta un nuevo usuario
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->nombre) && isset($data->email) && isset($data->password)) {
        $nombre = $data->nombre;
        $email = $data->email;
        $password = password_hash($data->password, PASSWORD_BCRYPT); // Encriptar la contraseña

        $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            echo json_encode(["mensaje" => "El correo electrónico ya está registrado"]);
        } else {
            $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $nombre, $email, $password);

            if ($stmt->execute()) {
                echo json_encode(["mensaje" => "Usuario creado con éxito"]);
            } else {
                echo json_encode(["mensaje" => "Error al crear usuario"]);
            }

            $stmt->close();
        }
    } else {
        echo json_encode(["mensaje" => "Datos incompletos"]);
    }
}

// Si la solicitud es de tipo PUT, se actualiza el usuario existente
elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id) && isset($data->nombre) && isset($data->email)) {
        $id = $data->id;
        $nombre = $data->nombre;
        $email = $data->email;

        $stmt = $conn->prepare("UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?");
        $stmt->bind_param("ssi", $nombre, $email, $id);

        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "Usuario actualizado con éxito"]);
        } else {
            echo json_encode(["mensaje" => "Error al actualizar el usuario"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["mensaje" => "Datos incompletos para la actualización"]);
    }
}

// Si la solicitud es de tipo DELETE, se elimina el usuario
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $data);
    
    if (isset($data['id'])) {
        $id = $data['id'];

        $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "Usuario eliminado con éxito"]);
        } else {
            echo json_encode(["mensaje" => "Error al eliminar el usuario"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["mensaje" => "ID de usuario no proporcionado"]);
    }
} else {
    echo json_encode(["mensaje" => "Método de solicitud no permitido"]);
}


// Cerrar la conexión
$conn->close();
?>
