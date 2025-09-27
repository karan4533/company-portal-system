<?php
include "./../include/config.php";
require_once("./loginverify.php");
date_default_timezone_set('Asia/Kolkata');

error_reporting(E_ALL);
ini_set('display_errors', 1);
$date = date("d-m-Y");

if (isset($_COOKIE['user_id']) && !empty($_COOKIE['user_id'])) {
    $_SESSION["user_id"] = base64_decode($_COOKIE['user_id']);
    $sql = "SELECT * FROM employee WHERE id ='{$_SESSION["user_id"]}'   AND active = 'active' AND status != 'Offline' AND FIND_IN_SET('Employee', Allpannel)";
    $result = mysqli_query($conn, $sql);
    if($result) {
        $row = mysqli_fetch_assoc($result);
        if($row) {
            $email = $row['email'];
            $existingAttendanceQuery = "SELECT * FROM attendance WHERE employee_id = '$email' AND date = '$date'";
            $result = mysqli_query($conn,$existingAttendanceQuery);
            if ($result && mysqli_num_rows($result) > 0) {
                header('Location: dashboard.php');
                exit;
            }
        }
    }
}
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if(!empty($_POST['logindata'])){
            $email = $_POST["email"];
            $password = $_POST["password"];                        
            $authenticator->authenticateUser($email, $password);
    }elseif(!empty($_POST['emailckeack'])){
        $email = $_POST["email1"];
        $authenticator->authenticateotp($email);
    }elseif(!empty($_POST['otpverfy'])){
        $otp = $_POST["otp"];
        $email = $_SESSION['email'];
        $authenticator->otpverfy($email,$otp);
    }
    elseif(!empty($_POST['password'])){
       $password =$_POST['password1'];
       $password1 = $_POST['password2'];
        $email = $_SESSION['email'];
        $authenticator->newpassword($email,$password,$password1);
    }

}
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>MINE | Jiffy</title>
    <!-- Favicon -->
    <link href="./../assets/images/Jiffy-favicon.png" rel="icon">

    <!-- Add jQuery FIRST -->
    <script src="./../assets/js/jquery.min.js"></script>
    
    <!-- Fixed CSS paths -->
    <link rel="stylesheet" href="./../assets/css/style.css">
    <link rel="stylesheet" href="./../assets/css/backend-plugin.min.css">
    <link rel="stylesheet" href="./../assets/vendor/remixicon/fonts/remixicon.css">
    <link rel="stylesheet" href="./../assets/vendor/line-awesome/dist/line-awesome/css/line-awesome.min.css">
    <link rel="stylesheet" href="./../assets/vendor/tui-calendar/tui-calendar/dist/tui-calendar.css">
    <link rel="stylesheet" href="./../assets/vendor/tui-calendar/tui-date-picker/dist/tui-date-picker.css">
    <link rel="stylesheet" href="./../assets/vendor/tui-calendar/tui-time-picker/dist/tui-time-picker.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    
    <style>
        /* Force modern login page styling */
        body.login-page {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            min-height: 100vh !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }

        .auth-card {
            border: none !important;
            border-radius: 20px !important;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1) !important;
            overflow: hidden !important;
            backdrop-filter: blur(10px) !important;
            background: rgba(255, 255, 255, 0.95) !important;
        }

        .content-left {
            background: linear-gradient(135deg, #e91e63 0%, #9c27b0 50%, #673ab7 100%) !important;
            padding: 60px 40px !important;
            border-radius: 20px 0 0 20px !important;
        }

        .content-right {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important;
            border-radius: 0 20px 20px 0 !important;
        }

        .floating-input {
            background: rgba(255, 255, 255, 0.15) !important;
            border: 2px solid rgba(255, 255, 255, 0.3) !important;
            border-radius: 12px !important;
            padding: 15px 20px !important;
            color: white !important;
            font-size: 16px !important;
            transition: all 0.3s ease !important;
        }

        .floating-input::placeholder {
            color: rgba(255, 255, 255, 0.7) !important;
        }

        .floating-input:focus {
            background: rgba(255, 255, 255, 0.25) !important;
            border-color: rgba(255, 255, 255, 0.8) !important;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3) !important;
            outline: none !important;
        }

        .custom-btn {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
            border: none !important;
            border-radius: 12px !important;
            padding: 15px 30px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            color: #e91e63 !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
            cursor: pointer !important;
            width: 100% !important;
        }

        .custom-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
        }

        .password-container {
            position: relative;
        }
        
        .eye-icon {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 10;
            color: rgba(255, 255, 255, 0.8);
            font-size: 18px;
            transition: color 0.3s ease;
        }
        .eye-icon:hover {
            color: white;
        }

        .image-right {
            filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        /* Loading screen styling */
        #loading {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: white !important;
            z-index: 9999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            pointer-events: none !important; /* Allow clicks to pass through */
        }

        #loading-center {
            width: 50px !important;
            height: 50px !important;
            border: 5px solid rgba(0, 0, 0, 0.1) !important;
            border-top: 5px solid #007bff !important;
            border-radius: 50% !important;
            animation: spin 1s linear infinite !important;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Ensure body and form elements are interactive */
        body.login-page {
            pointer-events: auto !important;
            overflow: auto !important;
        }

        .floating-input, .custom-btn, .eye-icon, .form-check-input {
            pointer-events: auto !important;
            cursor: pointer !important;
        }

        .floating-input {
            cursor: text !important;
        }
    </style>
</head>

<body class="login-page">
    <!-- loader Start -->
    <div id="loading">
        <div id="loading-center">
        </div>
    </div>
    <!-- loader END -->
    <!--Login Start-->
    <?php if (empty($_GET["login"])) : ?>
        <div class="wrapper">
            <section class="login-content">
                <div class="container">
                    <div class="row align-items-center justify-content-center height-self-center">
                        <div class="col-lg-8">
                            <div class="card auth-card" style="border: none !important; border-radius: 20px !important; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1) !important; overflow: hidden !important; backdrop-filter: blur(10px) !important; background: rgba(255, 255, 255, 0.95) !important;">
                                <div class="card-body p-0">
                                    <div class="d-flex align-items-center auth-content">
                                        <div class="col-lg-6 content-left" style="background: linear-gradient(135deg, #e91e63 0%, #9c27b0 50%, #673ab7 100%) !important; padding: 60px 40px !important; border-radius: 20px 0 0 20px !important;">
                                            <div class="p-3">
                                                <img src="./../assets/images/Jiffy-logo2.png" alt="JIFFY Logo" class="img-fluid mb-3">
                                                <h2 class="mb-2 text-white text-center">JIFFY</h2>
                                                <p class="text-center">Project Management System</p>

                                                <?php
                                                if (isset($_SESSION['errorr'])) {
                                                    echo "<div class='alert text-white bg-warning' role='alert'>
                                                         <div class='iq-alert-text'>" . $_SESSION['errorr'] . "</div>
                                                            <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                                            <i class='ri-close-line'></i>
                                                         </button>
                                                   </div>";
                                                    unset($_SESSION['errorr']);
                                                }
                                                ?>

                                                <form method="POST" action="#" name="logindata" id="loginForm">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="floating-label form-group">
                                                                <input class="floating-input form-control" type="email" 
                                                                       placeholder="Enter your email address" name="email" id="email" required>
                                                                <label for="email">Email Address</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-12">
                                                            <div class="floating-label form-group password-container">
                                                                <input class="floating-input form-control" type="password" 
                                                                       placeholder="Enter your password" name="password" id="password" required>
                                                                <label for="password">Password</label>
                                                                <i class="ri-eye-line eye-icon" id="togglePassword" onclick="togglePasswordVisibility()"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row mb-3">
                                                        <div class="col-lg-6">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" value="1" name="remember" id="remember">
                                                                <label class="form-check-label text-white" for="remember">
                                                                    Remember me
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <a href="index.php?login=password" class="text-white float-right">Forgot Password?</a>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="d-flex justify-content-center">
                                                                <button type="submit" class="btn custom-btn" name="logindata" style="width: 100%; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border: none; border-radius: 12px; padding: 15px 30px; font-size: 16px; font-weight: 600; color: #e91e63; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">
                                                                    Sign In to JIFFY
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        <div class="col-lg-6 content-right" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important; border-radius: 0 20px 20px 0 !important; display: flex; align-items: center; justify-content: center; padding: 40px;">
                                            <img src="./../assets/images/login/login-img2.png" class="img-fluid image-right" alt="Loginimage" style="filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2)); animation: float 6s ease-in-out infinite;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- Login end -->
    <?php endif; ?>

    <!-- Forgot Password start -->
    <?php if (isset($_GET['login']) && $_GET['login'] == "password") : ?>
        <div class="wrapper">
            <section class="login-content">
                <div class="container">
                    <div class="row align-items-center justify-content-center height-self-center">
                        <div class="col-lg-8">
                            <div class="card auth-card">
                                <div class="card-body p-0">
                                    <div class="d-flex align-items-center auth-content">
                                        <div class="col-lg-6 bg-primary content-left">
                                            <div class="p-3">
                                                <img src="./../assets/images/Jiffy-logo2.png" alt="Image description" class="img-fluid mb-3">
                                                <h2 class="mb-2 text-white">Forgot Password</h2>
                                                <p>Kindly provide your email address to proceed with the password reset process.</p>
                                                  <?php
                                                if (isset($_SESSION['errorr'])) {
                                                    echo "<div class='alert text-white bg-warning' role='alert'>
                                                         <div class='iq-alert-text'>" . $_SESSION['errorr'] . "</div>
                                                            <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                                            <i class='ri-close-line'></i>
                                                         </button>
                                                   </div>";
                                                    unset($_SESSION['errorr']);
                                                }
                                                ?>
                                                <form method="POST" action="#" name="emailckeack">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="floating-label form-group">
                                                                <input class="floating-input form-control" type="email" name="email1" placeholder=" " required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Enter valid email address">
                                                                <label>Email</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input type="submit" class="custom-btn btn-3 text-center"  value="Submit" name="emailckeack"> 
                                                </form>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 content-right">
                                            <img src="../assets/images/login/01.png" class="img-fluid image-right" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    <?php endif; ?>
    <!-- Forgot password end -->

    <!-- OTP start -->
    <?php if (isset($_GET['login']) && $_GET['login'] == "otp") : ?>
        <div class="wrapper">
            <section class="login-content">
                <div class="container">
                    <div class="row align-items-center justify-content-center height-self-center">
                        <div class="col-lg-8">
                            <div class="card auth-card">
                                <div class="card-body p-0">
                                    <div class="d-flex align-items-center auth-content">
                                        <div class="col-lg-6 bg-primary content-left">
                                            <div class="p-3">
                                                <img src="./../assets/images/Jiffy-logo2.png" alt="Image description" class="img-fluid mb-3">
                                                <img src="./../uploads/employee/<?= $_SESSION['profile_path']?>" class="rounded avatar-80 mb-3" alt="user-img">
                                                <h2 class="mb-2 text-white">Hi ! <?=$_SESSION['full_name']?></h2>
                                                <p>Enter OTP to reset the password.</p>
                                                  <?php
                                                if (isset($_SESSION['errorr'])) {
                                                    echo "<div class='alert text-white bg-warning' role='alert'>
                                                         <div class='iq-alert-text'>" . $_SESSION['errorr'] . "</div>
                                                            <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                                            <i class='ri-close-line'></i>
                                                         </button>
                                                   </div>";
                                                    unset($_SESSION['errorr']);
                                                }
                                                ?>
                                                <form method="post" action="#" name="otpverfy">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="floating-label form-group">
                                                                <input type="text" class="floating-input form-control" id="otpInput" placeholder=" " maxlength="5" pattern="[0-9]{5}" name="otp" required>
                                                                <label>OTP</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input type="submit" class="custom-btn btn-3 text-center" value="Reset" name="otpverfy">
                                                </form>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 content-right">
                                            <img src="../assets/images/login/01.png" class="img-fluid image-right" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    <?php endif; ?>
    <!-- OTP end -->

    <!--Reset Start-->
    <?php if (isset($_GET['login']) && $_GET['login'] == "reset") : ?>
        <div class="wrapper">
            <section class="login-content">
                <div class="container">
                    <div class="row align-items-center justify-content-center height-self-center">
                        <div class="col-lg-8">
                            <div class="card auth-card">
                                <div class="card-body p-0">
                                    <div class="d-flex align-items-center auth-content">
                                        <div class="col-lg-6 bg-primary content-left">
                                            <div class="p-3">
                                                <img src="./../assets/images/Jiffy-logo2.png" alt="Image description" class="img-fluid mb-3">
                                                <h2 class="mb-2 text-white">Reset Password</h2>
                                                <p>Set a new password for your account.</p>
                                                  <?php
                                                if (isset($_SESSION['errorr'])) {
                                                    echo "<div class='alert text-white bg-warning' role='alert'>
                                                         <div class='iq-alert-text'>" . $_SESSION['errorr'] . "</div>
                                                            <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                                            <i class='ri-close-line'></i>
                                                         </button>
                                                   </div>";
                                                    unset($_SESSION['errorr']);
                                                }
                                                ?>
                                                <form method="post" action="#" name="password">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="floating-label form-group">
                                                                <input class="floating-input form-control" type="password" id="newpassword" placeholder=" " required name="password1">
                                                                <label for="newpassword">New Password</label>
                                                                <span toggle="#newpassword" class="fa fa-fw fa-eye eye-icon toggle-password toggle-newpassword"></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="floating-label form-group">
                                                                <input class="floating-input form-control" type="password" id="confirmpassword" placeholder=" " required name="password2">
                                                                <label for="confirmpassword">Confirm Password</label>
                                                                <span toggle="#confirmpassword" class="fa fa-fw fa-eye eye-icon toggle-password toggle-confirmpassword"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input type="submit" class="custom-btn btn-3 text-center" value="Submit" name="password">
                                                </form>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 content-right">
                                            <img src="../assets/images/login/01.png" class="img-fluid image-right" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    <?php endif; ?>
    <!--Reset End-->

    <!-- Fixed JavaScript paths and order -->
    <!-- jQuery loads first (already added above) -->
    <script src="./../assets/js/backend-bundle.min.js"></script>
    <script src="./../assets/js/table-treeview.js"></script>
    <script src="./../assets/js/customizer.js"></script>
    <script src="./../assets/js/chart-custom.js"></script>
    <script src="./../assets/js/slider.js"></script>
    <script src="./../assets/js/app.js"></script>
    <script src="./../assets/vendor/moment.min.js"></script>
    
    <script>
        console.log("Login page JavaScript started loading...");

        // Enhanced password visibility toggle
        function togglePasswordVisibility() {
            console.log("Toggle password function called");
            const password = document.getElementById('password');
            const toggleIcon = document.getElementById('togglePassword');
            
            if (password && toggleIcon) {
                if (password.type === 'password') {
                    password.type = 'text';
                    toggleIcon.classList.remove('ri-eye-line');
                    toggleIcon.classList.add('ri-eye-off-line');
                } else {
                    password.type = 'password';
                    toggleIcon.classList.remove('ri-eye-off-line');
                    toggleIcon.classList.add('ri-eye-line');
                }
            }
        }

        // Loading screen management - Fixed to ensure it disappears
        window.addEventListener('load', function() {
            console.log("Window loaded, hiding loading screen...");
            // Force hide loading screen after a short delay
            setTimeout(function() {
                const loading = document.getElementById('loading');
                if (loading) {
                    loading.style.opacity = '0';
                    loading.style.transition = 'opacity 0.5s ease';
                    setTimeout(function() {
                        loading.style.display = 'none';
                        loading.style.visibility = 'hidden';
                        // Re-enable body interactions
                        document.body.style.pointerEvents = 'auto';
                        document.body.style.overflow = 'auto';
                        console.log("Loading screen hidden, page should be interactive now");
                    }, 500);
                }
            }, 200); // Reduced from 800ms to 200ms for faster load
        });

        // Fallback to hide loading screen if window.load doesn't fire
        document.addEventListener('DOMContentLoaded', function() {
            console.log("DOM loaded, setting up fallback...");
            setTimeout(function() {
                const loading = document.getElementById('loading');
                if (loading && loading.style.display !== 'none') {
                    console.log("Fallback: Hiding loading screen");
                    loading.style.display = 'none';
                    loading.style.visibility = 'hidden';
                    document.body.style.pointerEvents = 'auto';
                    document.body.style.overflow = 'auto';
                }
            }, 2000); // Fallback after 2 seconds
        });

        // Test click functionality
        setTimeout(function() {
            console.log("Testing page interactivity...");
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            if (email && password) {
                console.log("Form fields found, page should be interactive");
                // Force enable interactions
                email.style.pointerEvents = 'auto';
                password.style.pointerEvents = 'auto';
                email.disabled = false;
                password.disabled = false;
            }
        }, 3000);

        // Enhanced jQuery ready function
        $(document).ready(function() {
            console.log("jQuery ready function started");
            
            // Force hide loading screen as backup
            setTimeout(function() {
                $('#loading').hide();
                $('body').css({
                    'pointer-events': 'auto',
                    'overflow': 'auto'
                });
                console.log("jQuery: Loading screen hidden");
            }, 100);

            const error = "<?php echo isset($_SESSION['error']) ? $_SESSION['error'] : ''; ?>";
            if (error) {
                alert(error);
            }
            
            // Legacy password toggle for backward compatibility
            $('.toggle-password').on('click', function() {
                console.log("Legacy password toggle clicked");
                var input = $($(this).attr('toggle'));
                $(this).toggleClass('fa-eye fa-eye-slash');
                if (input.attr('type') == 'password') {
                    input.attr('type', 'text');
                } else {
                    input.attr('type', 'password');
                }
            });

            // Form validation enhancement
            $('#loginForm').on('submit', function(e) {
                console.log("Form submitted");
                const email = $('#email').val();
                const password = $('#password').val();
                
                if (!email || !password) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                    return false;
                }
                
                // Show loading state
                const submitBtn = $(this).find('button[type="submit"]');
                const originalText = submitBtn.html();
                submitBtn.html('<i class="spinner-border spinner-border-sm mr-2"></i>Signing In...');
                submitBtn.prop('disabled', true);
                
                // Re-enable button after 5 seconds to prevent permanent disable on error
                setTimeout(function() {
                    submitBtn.html(originalText);
                    submitBtn.prop('disabled', false);
                }, 5000);
            });

            // Auto-focus first input
            $('#email').focus();
            console.log("jQuery setup complete");
        });
    </script>
</body>

</html>