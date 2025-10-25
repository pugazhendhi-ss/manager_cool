
import hashlib
import base64

# This salt must be the same in script.js
SALT = "VigneshSarumathy_Wedding_2025"

def generate_password_hash(password):
    """Hashes the password with SHA-256 and a salt."""
    salted_password = password + SALT
    return hashlib.sha256(salted_password.encode()).hexdigest()

def encode_gift_card(gift_card_code):
    """Encodes the gift card code using Base64."""
    return base64.b64encode(gift_card_code.encode()).decode()

def main():
    """Main function to get inputs and generate hashes."""
    print("--- Hash Generator for Wedding Gift App ---")
    
    password = input("Enter the password to hash (e.g., VigneshSarumathy): ")
    gift_card_code = input("Enter the gift card code to encode: ")
    
    hashed_password = generate_password_hash(password)
    encoded_gift_card = encode_gift_card(gift_card_code)
    
    print("\n--- Generated Hashes ---")
    print("Copy these values into script.js\n")
    print(f'const APPPWD = "{hashed_password}";')
    print(f'const APAYGC = "{encoded_gift_card}";')
    print("\n------------------------\n")

if __name__ == "__main__":
    main()
