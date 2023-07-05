import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate(
    "C:\\dc\\rafael-17e19-firebase-adminsdk-wxg5k-be080ca0bf.json"
)
firebase_admin.initialize_app(
    cred,
    {"databaseURL": "https://rafael-17e19-default-rtdb.firebaseio.com/"},
)


def print_attack_part(attack, category):
    if category in attack:
        print(category + ":")
        print(attack[category])
    else:
        print("Category not found in the attack.")


def print_attack(attack_id):
    attack = get_attack_by_id(attack_id)

    if attack:
        print("Attack ID:", attack.get("id", "Unknown"))
        print("Attack Name:", attack.get("name", "Unknown"))
        print("Description:", attack.get("description", "Unknown"))
        # Print additional fields as needed
    else:
        print("Attack not found!")


def get_attack_by_id(attack_id):
    # Get a reference to the "attacks" node in the Firebase database
    ref = db.reference("attacks")

    # Query the database to find the attack with the matching ID
    query = ref.order_by_child("id").equal_to(attack_id)
    attacks = query.get()

    # Return the retrieved attack
    if attacks:
        for attack_data in attacks.values():
            return attack_data

    # Return None if attack with the ID is not found
    return None


def print_attack_category(attacks):
    for attack in attacks:
        print(f"Attack ID: {attack['Attack ID']}")
        print(f"Attack Name: {attack['Attack Name']}")
        # for key, value in attack.items():
        #     if key not in ["Attack ID", "Attack Name"]:
        #         print(f"{key.capitalize()}: {value}")
        # print()  # Print an empty line for separation


def get_attack_by_name(attack_name, max_count):
    ref = db.reference("attacks")

    query = ref.order_by_child("name").equal_to(attack_name).limit_to_first(max_count)
    attacks = query.get()

    if attacks:
        result = []
        for attack_id, attack_data in attacks.items():
            original_id = attack_data.get("id", "Unknown")
            attack_name = attack_data.get("name", "Unknown")
            attack_description = attack_data.get("description", "Unknown")
            # Add additional fields as needed

            # Create a dictionary containing the attack details
            attack = {
                "Attack ID": original_id,
                "Attack Name": attack_name,
                "Description": attack_description,
                # Add additional fields as needed
            }

            result.append(attack)

        return result
    else:
        return "Attack not found!"


def print_all_attacks():
    ref = db.reference("attacks")
    attacks = ref.get()

    if attacks:
        for attack_id, attack_data in attacks.items():
            original_id = attack_data.get("id", "Unknown")
            attack_name = attack_data.get("name", "Unknown")
            # Add additional fields as needed

            print("Attack ID:", original_id)
            print("Attack Name:", attack_name)

            print()  # Print an empty line for seSparation

    else:
        print("No attacks found in the database.")


def print_category_part(category):
    ref = db.reference("attacks")
    attacks = ref.get()

    if attacks:
        category_exists = False
        for attack_data in attacks.values():
            if category in attack_data:
                category_exists = True
                break

        if category_exists:
            for attack_data in attacks.values():
                print_attack_part(attack_data, category)
                print()
        else:
            print("Category not found in any attack.")
    else:
        print("No attacks found in the database.")


# Example usage:
