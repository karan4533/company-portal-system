# Company Portal System

A comprehensive PHP-based company management portal designed to streamline business operations and employee management.

## Features

### 🏢 **Business Management**
- Employee registration and management
- Department organization
- Role-based access control
- Task tracking and assignment

### 👥 **Employee Portal**
- Personal dashboard
- Leave management
- Salary slip generation
- Profile management
- Time tracking and attendance

### 🛠 **Admin Panel**
- User management
- Payroll processing
- Attendance monitoring
- Report generation
- System configuration

### 📊 **Additional Modules**
- Project management
- Document management
- Communication system
- Reporting and analytics

## Project Structure

```
company-portal-system/
├── admin/              # Admin panel functionality
├── business/           # Business management modules
├── Accounts/           # Employee account management
├── assets/             # Static assets (CSS, JS, images)
├── assets2/            # Additional assets
├── include/            # Common PHP includes
├── uploads/            # File upload directory
├── pdf/                # PDF generation
├── resume_directory/   # Resume storage
└── vendor/             # Third-party libraries
```

## Technologies Used

- **Backend**: PHP
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MySQL (via XAMPP)
- **PDF Generation**: Custom PHP implementation
- **File Management**: PHP file handling

## Installation

1. **Prerequisites**
   - XAMPP or similar PHP development environment
   - MySQL database
   - Web browser

2. **Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/karan4533/company-portal-system.git
   
   # Move to XAMPP htdocs directory
   cp -r company-portal-system /xampp/htdocs/
   
   # Configure database connection in include/config.php
   # Import database schema (if available)
   ```

3. **Access the Application**
   - Open browser and navigate to `http://localhost/company-portal-system`
   - Configure initial admin account
   - Start using the portal

## Usage

### For Administrators
1. Access admin panel at `/admin/`
2. Configure system settings
3. Manage users and departments
4. Generate reports

### For Employees
1. Login through main portal
2. Access personal dashboard
3. Submit leave requests
4. View salary information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is developed for company internal use. Please respect intellectual property rights.

## Support

For support and inquiries, please contact the development team.

---

**Note**: This is a PHP-based web application designed for company internal use. Ensure proper security measures are in place before deployment.