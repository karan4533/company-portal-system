<?php
// Test database connection
echo "Testing database connection...\n";

$host = "localhost";
$username = "root";
$password = "";
$database = "snh6_jiffy2";

echo "Connecting to: $host\n";
echo "Database: $database\n";
echo "Username: $username\n";

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    echo "❌ Connection failed: " . mysqli_connect_error() . "\n";
    echo "Error number: " . mysqli_connect_errno() . "\n";
} else {
    echo "✅ Connection successful!\n";
    echo "MySQL version: " . mysqli_get_server_info($conn) . "\n";
    
    // Test a simple query
    $result = mysqli_query($conn, "SELECT DATABASE() as current_db");
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo "Current database: " . $row['current_db'] . "\n";
    }
    
    mysqli_close($conn);
}
?>