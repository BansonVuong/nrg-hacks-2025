import json
import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

# Read data from parts.json
with open('keycaps.json', 'r') as file:
    parts = json.load(file)

# Insert data into ITEMS table
for part in parts:
    cursor.execute('''
    INSERT INTO ITEMS (TYPE, NAME, DESCRIPTION, MATERIAL, PRICE, RATING) VALUES (?, ?, ?, ?, ?, ?)
    ''', ("KEYCAP", part['name'], part['description'], part['material'], part['price'], part['rating']))

# Read data from switches.json
with open('switches.json', 'r') as file:
    switches = json.load(file)

# Insert data into ITEMS table
for switch in switches:
    cursor.execute('''
    INSERT INTO ITEMS (TYPE, NAME, DESCRIPTION, PRICE, QUANTITY, PRICE_PER_SWITCH, SWITCH_TYPE, BRAND, RATING) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', ("SWITCH", switch['name'], switch['description'], switch['price'], switch['quantity_of_package'], switch['price_per_switch'], switch['type'], switch['brand'], switch['rating']))

# Read data from boards.json
with open('boards.json', 'r') as file:
    boards = json.load(file)

# Insert data into ITEMS table
for board in boards:
    cursor.execute('''
    INSERT INTO ITEMS (TYPE, NAME, DESCRIPTION, PRICE, SIZE, PCB_INCLUDED, HOTSWAPPABLE, BRAND, RATING) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', ("BOARD", board['name'], board['description'], board['price'], board['size'], board['pcb-included'], board['hotswappable'], board['brand'], board['rating']))
conn.commit()
conn.close()

