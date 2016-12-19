serve:
	git submodule update --init --recursive
	@echo creating temp key &&\
		(echo '\n\r' '\n\r' '\n\r' '\n\r' '\n\r' '\n\r' '\n\r' |\
			openssl req -new -x509 -keyout temp.pem -out temp.pem -days 365 -nodes 2>&1 >/dev/null) &&\
		echo &&\
		python local-ssl-server.py &&\
		echo removing temp key &&\
		rm temp.pem &&\
		echo removed