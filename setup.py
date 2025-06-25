from setuptools import setup

setup(name='glasseye',
      version='0.2.0',
      description='A python module for including beautiful charts in Markdown for conversion to HTML',
      url='https://github.com/hubbl-ai/glasseye',
      author='hubbl-ai',
      author_email='info@hubbl.ai',
      license='MIT',
      packages=['glasseye'],
      zip_safe=False,
      entry_points = {
        'console_scripts': ['glasseye=glasseye.__main__:main'],
      },
      include_package_data=True,
      install_requires=[
          'pypandoc', 'beautifulsoup4', 'seaborn'
      ])
