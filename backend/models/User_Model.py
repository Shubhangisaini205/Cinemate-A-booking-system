# models/user.py
class User:
    def __init__(self, username, email, password,role,payment):
        self.username = username
        self.email = email
        self.password = password
        self.role = role
        self.payment=  payment
    
    def is_valid(self):
        return bool(self.username and self.email and self.password)
