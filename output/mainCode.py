import dbHelper as db
import bot as bot
import time

name = ""


def print_with_animation(text):
    for char in text:
        print(char, end="", flush=True)
        time.sleep(0.05)  # Adjust the delay (in seconds) for desired speed


def get_name():
    global name
    print_with_animation(
        "Hello and Welcome to the bot, before We start let us know your name: "
    )
    name = input()
    print_with_animation("Initializing...\n")
    print_menu()


def searching_db():
    print_with_animation("Enter your param of searching (for quit Enter #): ")
    category = input()
    while category != "#":
        if category == "name":
            name = input("Enter your name: ")
            db.print_attack_category(db.get_attack_by_name(name, 10))
        elif category == "id":
            attack_id = input("Enter your id: ")

            db.print_attack(attack_id)
        else:
            print_with_animation("\nThe categories has to be: id, name.\n")
        print_with_animation("Enter your param of searching (for quit Enter #): ")
        category = input()


def printing_db():
    print_with_animation("Enter your param of printing (for quit Enter #): ")
    category = input()
    while category != "#":
        db.print_category_part(category)
        print_with_animation("\nEnter your param of printing (for quit Enter #): ")

        category = input()


def start_db():
    print_with_animation(
        "Welcome to our database service, "
        + name
        + " just for your knowledge the database that our company works with is firebase!.\n"
    )
    print_with_animation(
        "[1] - printing all the attack by category\n[2] - Search specific categories\n[#] quit: "
    )
    option = input()
    while option != "#":
        if option == "1":
            printing_db()
        elif option == "2":
            searching_db()
        else:
            print_with_animation("Error the input has to be 1 or 2 or #\n ")
        print_with_animation(
            "[1] - printing all the attack by category\n[2] - Search specific categories\n[#] quit: "
        )
        option = input()
    print_with_animation("I see... \n")


def print_menu():
    print_with_animation(
        "welcome "
        + name
        + " to our bot service! \n[1] - talk with the api of TotalVirus.\n[2] - talk with our database and check some new details!.\n[#] - quit\n"
    )
    option = input()
    while option != "#":
        if option == "1":
            bot.start_input()
            print_with_animation(
                "\nI see you finished to scan. If you want to quit just press #, else press 1 or 2: "
            )
        elif option == "2":
            start_db()
            print_with_animation(
                "\nI see you finished to talking with the db. If you want to quit just press #, else press 1 or 2: "
            )
        else:
            print_with_animation("Error the input has to be 1 or 2 or #: ")
        option = input()


def main():
    get_name()


if __name__ == "__main__":
    main()
