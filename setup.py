from setuptools import setup

setup(name='doodl',
      version='0.2.0',
      description='A python module for including beautiful charts in Markdown for conversion to HTML',
      url='https://github.com/hubbl-ai/doodl',
      author='hubbl-ai',
      author_email='info@hubbl.ai',
      license='MIT',
      packages=['doodl'],
      zip_safe=False,
      entry_points = {
        'console_scripts': ['doodl=doodl.__main__:main'],
      },
      include_package_data=True,
      install_requires=[
          'pypandoc', 'beautifulsoup4', 'seaborn'
      ])
