#pip install Pillow
#pip install bs4
#pip install requests

from bs4 import BeautifulSoup
from PIL import Image

import requests
import os
import PIL 

from io import BytesIO

def obtemNoticias(dir, arquivo):

    url = 'https://ge.globo.com/futebol/brasileirao-serie-a/'

    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')


    #CONTEUDO DA PAGINA
    script = str(soup.find_all('script', id='scriptReact')[0]).replace('<script id="scriptReact" type="text/javascript">', '').replace('</script>', '\n')


    for y in range(1,39):
        
        url = 'https://api.globoesporte.globo.com/tabela/d1a37fa4-e948-43a6-ba53-ab24ab3a45b1/fase/fase-unica-campeonato-brasileiro-2021/rodada/%s/jogos/' % (y)

        page = requests.get(url)
        soup = BeautifulSoup(page.content, 'html.parser')

        script += 'var rd%s = %s \n' % (y, str(soup))

    #SALVA INFOS NO ARQUIVO   
    if os.path.isdir(dir) == False :
        os.makedirs(dir)

    arquivo = open('%s/%s.js' % (dir, arquivo), 'w')

    arquivo.write(str(script))

    arquivo.close()


obtemNoticias("attResultado", "g1")

