import hashlib


def save_file(filepath, file):
	with open(filepath, "wb") as destination:
		for chunk in file.chunks():
			destination.write(chunk)


def md5(s: str):
	m = hashlib.md5()
	m.update(s.encode('utf-8'))
	return m.hexdigest()
